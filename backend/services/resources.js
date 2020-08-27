'use strict';
const logger = require('../log/logger')('Resources');
const shell = require('shelljs');
const os = require('os');
const fs = require('fs');
const db = require('../models');

class ResourceService {
    constructor(monitoring, storage, notification) {
        //Services
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
     *
     * @param jobId
     * @param jobData
     * @returns {Promise<boolean>}
     */
    async runJob(jobId, jobData) {
        //this.notfication.sendPushNotification("jobs", "Your Job is now running", "");
        const tag = `${new Date().getTime()}`;

        let childProcess;
        const self = this;
        switch (jobData.type) {
            case 'normal':
                logger.info("Executing openlane regular shell script...");
                childProcess = shell.exec(`sudo ./openlane-run.sh ${jobData.type} ${jobData.designName} ${tag}`, {
                    silent: true,
                    async: true
                });
                childProcess.stdout.on('data', (data) => {
                    if (!self.jobs.get(jobId).stopped)
                        self.statusUpdate(jobId, jobData.designName, tag);
                    self.jobMonitoring.send(jobData.user_uuid, data);
                });
                break;
            case 'exploratory':
                let regressionScript = '';
                for (const property in jobData.regressionScript) {
                    if (jobData.regressionScript.hasOwnProperty(property)) {
                        if (property !== 'extra')
                            regressionScript += `${property}=(${jobData.regressionScript[property]})\n`;
                        else if (jobData.regressionScript[property] !== '')
                            regressionScript += `\n${property}="${jobData.regressionScript[property]}\n"\n`;
                    }
                }
                const regressionScriptName = `${jobData.user_uuid}-${tag}-regression.config`;
                logger.info("Creating Regression Script...");
                fs.writeFileSync(`openlane_working_dir/openlane/scripts/${regressionScriptName}`, regressionScript);
                logger.info("Executing openlane exploratory shell script...");
                childProcess = shell.exec(`sudo ./openlane-run.sh ${jobData.type} ${jobData.designName} ${tag} ./scripts/${regressionScriptName}`, {
                    silent: true,
                    async: true
                });
                break;
            default:
        }
        const intervalId = setInterval(() => {
            self.statusUpdate(jobId, jobData.designName);
        }, 1000);
        logger.info(`Saving Job #${jobId}`);
        this.jobs.set(jobId, {process: childProcess, tag: tag, stopped: false, runs: [], intervalId: intervalId});

        logger.info(`Registering event listeners for Job #${jobId}`);
        childProcess.stderr.on('data', function (data) {
            logger.info(data);
            //Stream
            self.jobMonitoring.send(jobData.user_uuid, data);
            //Scan for runs
            if (data.includes('running')) {
                const keywords = data.split('] ')[1].split(' ');
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
            }
        });
        childProcess.stdout.on('data', (data) => {
            //Stream
            self.jobMonitoring.send(jobData.user_uuid, data);
        });

        return new Promise(resolve => {
            childProcess.on('exit', (c) => {
                const job = self.jobs.get(jobId);
                clearInterval(job.intervalId);
                db['job'].update({
                    status: 'archiving'
                }, {
                    where: {
                        jobId: jobId
                    }
                }).then(() => {
                    for (let i = 0; i < job.runs.length; i++) {
                        self.storage.zip(`openlane_working_dir/openlane/designs/${jobData.designName}/runs/${job.runs[i].name}`, `./downloads/${jobData.user_uuid}-${jobId}-${job.runs[i].name}.zip`);
                    }
                });
                shell.mv(`openlane_working_dir/openlane/regression_results/${tag}.csv`, `~/openlane-cloud/backend/reports/${jobId}.csv`);
                resolve(c);
            });
        }).then(() => {
            return this.jobs.get(jobId).stopped;
        });
    }

    async quitProcess(jobId) {
        const job = this.jobs.get(jobId.toString());
        await db['job'].update({
            status: 'stopping'
        }, {
            where: {
                jobId: jobId
            }
        }).then((result) => {
            logger.info(`Stopping Job #${jobId}`);
            job.stopped = true;
            this.jobs.set(jobId, job);
            const childProcess = shell.exec(`sudo docker stop ${job.tag}`, {
                silent: true,
                async: true
            });
        });
    }

    statusUpdate(jobId, designName) {
        const self = this;
        const job = self.jobs.get(jobId);
        for (let i = 0; i < job.runs.length; i++) {
            if (job.runs[i].currentStage === (this.stageNames.length - 1))
                return;
            if (job.runs[i].currentStage === -1) {
                fs.readdir(`openlane_working_dir/openlane/designs/${designName}/runs/${job.runs[i].name}/logs/`, function (err, items) {
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
            } else {
                fs.readdir(`openlane_working_dir/openlane/designs/${designName}/runs/${job.runs[i].name}/logs/${this.stageNames[job.runs[i].currentStage]}`, function (err, items) {
                    if (err) {
                        //No directory yet
                        logger.error(err);
                        return;
                    }

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

    }

    cleanup() {

    }

    hookSocket(jobId, user_uuid) {
    }


}


module.exports = ResourceService;