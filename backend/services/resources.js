'use strict';
const logger = require('../log/logger')('Resources');
const shell = require('shelljs');
const os = require('os');
const fs = require('fs');
const db = require('../models');

class ResourceService {
    constructor(monitoring, notification) {
        //Services
        this.jobMonitoring = monitoring;
        this.notfication = notification;
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

    async runJob(jobId, jobData) {
        //this.notfication.sendPushNotification("jobs", "Your Job is now running", "");
        logger.info("Executing openlane shell script...");
        const tag = `${new Date().getTime()}`;
        let childProcess;
        if (jobData.type === 'normal') {
            childProcess = shell.exec(`sudo ./openlane-run.sh ${jobData.type} ${jobData.designName} ${tag}`, {async: true});
        } else {
            let regressionScript = '';
            for (const property in jobData.regressionScript) {
                if (jobData.regressionScript.hasOwnProperty(property)) {
                    if (property !== 'extra')
                        regressionScript += `${property}=(${jobData.regressionScript[property]})\n`;
                    else
                        regressionScript += `${property}="\n${jobData.regressionScript[property]}\n"\n`;
                }
            }
            const regressionScriptPath = `openlane_working_dir/openlane/scripts/${jobData.user_uuid}-${tag}-regression.config`;
            fs.writeFileSync(regressionScriptPath, regressionScript, function (err) {
                if (err) {
                    return logger.error(err);
                }
                logger.info("Regression Script Created");
                childProcess = shell.exec(`sudo ./openlane-run.sh ${jobData.type} ${jobData.designName} ${tag} ${regressionScriptPath}`, {async: true});
            });
        }
        this.jobs.set(jobId, {process: childProcess, currentStage: -1});
        const self = this;
        childProcess.stdout.on('data', function (data) {
            self.statusUpdate(jobId, jobData.designName, tag);
            self.jobMonitoring.send(jobData.user_uuid, data);
        });
        childProcess.stderr.on('data', function (error) {
            logger.error(error);
            self.jobMonitoring.send(jobData.user_uuid, error);
        });
        return new Promise(resolve => {
            childProcess.on('exit', (c) => resolve(c));
        }).then(() => {
            return `openlane_working_dir/openlane/designs/${jobData.designName}/runs/${tag}`
        });
    }

    statusUpdate(jobId, designName, tag) {
        const self = this;
        const job = self.jobs.get(jobId);
        if (job.currentStage === (this.stageNames.length - 1))
            return;
        if (job.currentStage === -1) {
            fs.readdir(`openlane_working_dir/openlane/designs/${designName}/runs/${tag}/logs/`, function (err, items) {
                if (err) {
                    //No directory yet
                    logger.error(err);
                    return;
                }

                //First Stage
                if (items.length !== 0) {
                    job.currentStage++;
                    db['job'].update({
                        status: `running-${self.stageNames[job.currentStage]}`
                    }, {
                        where: {
                            jobId: jobId
                        }
                    }).then(() => {
                        self.jobs.set(jobId, job);
                    });
                }
            });
        } else {
            fs.readdir(`openlane_working_dir/openlane/designs/${designName}/runs/${tag}/logs/${this.stageNames[job.currentStage]}`, function (err, items) {
                if (err) {
                    //No directory yet
                    logger.error(err);
                    return;
                }

                if (items.length !== 0) {
                    job.currentStage++;
                    db['job'].update({
                        status: `running-${self.stageNames[job.currentStage]}`
                    }, {
                        where: {
                            jobId: jobId
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