'use strict';
const logger = require('../log/logger')('Resources');
const shell = require('shelljs');
const os = require('os');
const fs = require('fs');
const db = require('../models');
const path = require('path');
const {v4: uuidv4} = require('uuid');

/**
 * @class ResourceService
 * @classdesc Resource service responsible for running and managing already running jobs
 */
class ResourceService {
    constructor(monitoring, storage, notification) {
        //Services
        this.openlanePath = 'openlane_working_dir/openlane';
        this.scriptsDir = 'scripts';
        this.designsDir = 'designs';
        this.runsDir = 'runs';
        this.reportsDir = 'reports';
        this.regressionResultsDir = 'regression_results';
        this.logsDir = 'logs';
        this.runCommand = 'sudo ./openlane-run.sh';

        this.jobMonitoring = monitoring;
        this.notfication = notification;
        this.storage = storage;
        this.jobs = new Map();
        this.stageNames = [
            'synthesis',
            'floorplan',
            'placement',
            'cts',
            'routing',
            'lvs',
            'magic'
        ];
        logger.info("Resource service initialized");
    }

    updateCPU() {
        const cpuCount = os.cpus().length;
        logger.warn(cpuCount);
        logger.warn(os.totalmem() / (1024 * 1024 * 1024));
    }

    /**
     * Create the command string for running the openlane shell script
     * @param args
     * @returns {string}
     */
    getRunCommand(args) {
        let runCommand = this.runCommand;
        for (const arg in args)
            if (args.hasOwnProperty(arg))
                runCommand += ` --${arg}=${args[arg]}`;
        return runCommand;
    }

    /**
     * Creates a regression configuration file in the scripts directory of openlane
     * @param regressionScriptFields
     * @param tag
     * @returns {string}
     */
    createRegressionScript(regressionScriptFields, tag) {
        let regressionScript = '';
        for (const property in regressionScriptFields) {
            if (regressionScriptFields.hasOwnProperty(property))
                if (property !== 'extra')
                    regressionScript += `${property}=(${regressionScriptFields[property]})\n`;
                else if (regressionScriptFields[property] !== '')
                    regressionScript += `\n${property}="${regressionScriptFields[property]}\n"\n`;
        }
        const regressionScriptName = `${tag}-regression.config`;
        logger.info("Creating Regression Script...");
        fs.writeFileSync(`./${this.openlanePath}/${this.scriptsDir}/${regressionScriptName}`, regressionScript);
        return regressionScriptName;
    }

    /**
     * Run a job and setup event listeners on the child process
     * @param jobId
     * @param jobData
     * @returns {Promise<boolean>}
     */
    async runJob(jobId, jobData) {
        if (jobData.notificationsEnabled)
            this.notfication.sendPushNotification("jobs", "Your Job is now running", "");
        const self = this;

        // Generate a uuid tag for this run
        const tag = uuidv4();
        logger.info(`Generated tag for job run: ${tag}`);

        // Construct arguments for job type
        logger.info("Constructing args for shell script...");
        let args = {};
        const dirPath = `./${this.designsDir}/${jobId}-${jobData.designName}`;
        switch (jobData.type) {
            case 'normal':
                args['type'] = 'regular';
                args['design-dir'] = dirPath;
                args['design-name'] = `${jobData.designName}`;
                args['tag'] = tag;
                args['threads'] = 1;
                args['cpus'] = 1;
                args['memory'] = '4G';
                break;
            case 'exploratory':
                args['type'] = jobData.type;
                args['design-dir'] = dirPath;
                args['design-name'] = `${jobData.designName}`;
                args['threads'] = 4;
                args['tag'] = tag;
                args['cpus'] = 4;
                args['memory'] = '16G';
                const regressionScriptName = this.createRegressionScript(jobData.regressionScript, tag);
                args['regression-script'] = `./${this.scriptsDir}/${regressionScriptName}`;
                break;
            default:
        }
        // Execute Child Process
        const commandString = this.getRunCommand(args);
        logger.info(`Command string: ${commandString}`);
        logger.info(`Executing openlane ${jobData.type} shell script...`);
        const childProcess = shell.exec(commandString, {silent: true, async: true});

        // Status Update Polling
        logger.info(`Starting run status update polling...`);
        const intervalId = setInterval(() => {
            self.statusUpdate(jobId, jobData.designName);
        }, 1000);

        // Save job to map
        logger.info(`Saving Job: ${jobId} to map`);
        this.jobs.set(jobId, {process: childProcess, tag: tag, stopped: false, runs: [], intervalId: intervalId});

        // Register event listeners on both err and out pipes
        logger.info(`Registering event listeners for Job: ${jobId}`);
        // Out Pipe
        childProcess.stdout.on('data', (data) => {
            //Log
            logger.info(data);
            //Stream
            self.jobMonitoring.send(jobData.user_uuid, data);
        });

        // Err Pipe
        childProcess.stderr.on('data', function (data) {
            //Log
            logger.info(data);
            //Stream
            self.jobMonitoring.send(jobData.user_uuid, data);
            //Scan for runs
            if (data.includes('running')) {
                const keywords = data.split('] ')[1].split(' ');
                console.log(jobId);
                db['run'].create({
                    jobId: jobId,
                    name: keywords[1],
                    status: 'running'
                }).then((result) => {
                    const job = self.jobs.get(jobId);
                    result.currentStage = -1;
                    job.runs.push(result);
                    self.jobs.set(jobId, job);
                })
            } else if (data.includes('finished')) {
                const keywords = data.split('] ')[1].split(' ');
                db['run'].update({status: 'completed'}, {
                    where: {
                        jobId: jobId,
                        name: keywords[1],
                    }
                }).then((result) => {
                    const job = self.jobs.get(jobId);
                    job.runs.push(result);
                    self.jobs.set(jobId, job);
                })
            }
        });

        // Exit Listener
        return new Promise(resolve => {
            childProcess.on('exit', (c) => {
                const job = self.jobs.get(jobId);
                clearInterval(job.intervalId);
                db['job'].update({status: 'archiving'}, {where: {jobId: jobId}}).then(() => {
                    for (let i = 0; i < job.runs.length; i++) {
                        self.storage.zip(
                            `${this.openlanePath}/${this.designsDir}/${jobId}-${jobData.designName}/${this.runsDir}/${job.runs[i].name}`,
                            `./downloads/${jobData.user_uuid}-${jobId}-${job.runs[i].name}.zip`
                        );
                        shell.exec(`sudo rm -rf ${this.openlanePath}/${this.designsDir}/${jobId}-${jobData.designName}/${this.runsDir}/${job.runs[i].name}`);
                    }
                    if (jobData.type === 'exploratory')
                        shell.exec(`sudo rm -rf ${this.openlanePath}/${this.scriptsDir}/${tag}-regression.config`);
                    shell.mv(`${this.openlanePath}/${this.regressionResultsDir}/${tag}/${tag}.csv`, `~/openlane-cloud/backend/${this.reportsDir}/${jobId}.csv`);
                    resolve(c);
                });
            });
        }).then(() => {
            const stopped = this.jobs.get(jobId).stopped;
            this.jobs.delete(jobId);
            return stopped;
        });
    }

    /**
     * Quits the job process
     * @param jobId
     * @returns {Promise<void>}
     */
    async quitProcess(jobId) {
        const job = this.jobs.get(jobId.toString());
        await db['job'].update({status: 'stopping'}, {where: {jobId: jobId}}).then((result) => {
            logger.info(`Stopping Job #${jobId}`);
            job.stopped = true;
            this.jobs.set(jobId, job);
            const childProcess = shell.exec(`sudo docker stop ${job.tag}`, {
                silent: true,
                async: true
            });
            childProcess.on('exit', (c) => {
                //Send Notification
            });
        });
    }

    /**
     * Checks for stage changes for each run in this job
     * @param jobId
     * @param designName
     */
    statusUpdate(jobId, designName) {
        const self = this;
        const job = self.jobs.get(jobId);
        for (let i = 0; i < job.runs.length; i++) {
            if (job.runs[i].currentStage === (this.stageNames.length - 1))
                continue;
            fs.readdir(job.runs[i].currentStage === -1 ?
                `${this.openlanePath}/${this.designsDir}/${jobId}-${designName}/${this.runsDir}/${job.runs[i].name}/${this.logsDir}/` :
                `${this.openlanePath}/${this.designsDir}/${jobId}-${designName}/${this.runsDir}/${job.runs[i].name}/${this.logsDir}/${this.stageNames[job.runs[i].currentStage]}`,
                function (err, items) {
                    if (err) {
                        //No directory yet
                        logger.error(err);
                        return;
                    }
                    //First Stage
                    if (items.length !== 0) {
                        job.runs[i].currentStage++;
                        db['run'].update({
                            status: `running-${self.stageNames[job.runs[i].currentStage]}`
                        }, {
                            where: {
                                id: job.runs[i].id
                            }
                        }).then(() => {
                            self.jobs.set(jobId, job);
                        });
                    }
                });
        }

    }

    hookSocket(jobId, user_uuid) {
    }

}

module.exports = ResourceService;