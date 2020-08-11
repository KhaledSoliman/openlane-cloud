'use strict';
const logger = require('../log/logger')('Resources');
const shell = require('shelljs');
const os = require('os');
const fs = require('fs');
const db = require('../models');

class ResourceService {
    constructor(monitoring) {
        //Services
        this.jobMonitoring = monitoring;
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

    async runJob(jobId, designName, user_uuid, regToken) {
        // const message = {
        //     "notification": {
        //         "title": "jobs",
        //         "body": "Your Job is now running"
        //     },
        //     token: regToken
        // };
        // admin.messaging().send(message)
        //     .then((response) => {
        //         // Response is a message ID string.
        //         console.log('Successfully sent message:', response);
        //     })
        //     .catch((error) => {
        //         console.log('Error sending message:', error);
        //     });
        logger.info("Executing openlane shell script...");
        const tag = `${new Date().getTime()}`;
        const child = shell.exec(`sudo ./openlane-run.sh ${designName} ${tag}`, {async: true});
        this.jobs.set(jobId, {process: child, currentStage: -1});
        const self = this;
        child.stdout.on('data', function (data) {
            self.statusUpdate(jobId, designName, tag);
            self.jobMonitoring.send(user_uuid, data);
        });
        child.stderr.on('data', function (error) {
            logger.error(error);
            self.jobMonitoring.send(user_uuid, error);
        });
        return new Promise(resolve => {
            child.on('exit', (c) => resolve(c));
        }).then();
    }

    statusUpdate(jobId, designName, tag) {
        const self = this;
        const job = self.jobs.get(jobId);
        if(job.currentStage === -1) {
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