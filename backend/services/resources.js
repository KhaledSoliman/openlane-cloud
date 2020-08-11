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
        this.stageNames = ['cts',  'floorplan',  'lvs',  'magic',  'placement',  'routing',  'synthesis'];
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
        this.jobs.set(jobId, {process: child, stages: []});
        const self = this;
        child.stdout.on('data', function (data) {
            self.statusUpdate(jobId, designName, tag);
            logger.info('streaming data...');
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
        fs.readdir(`openlane_working_dir/openlane/designs/${designName}/${tag}/`, function(err, items) {
            if (err) {
                logger.error(err);
                return;
            }
            const filteredItems = items.filter((item) => self.stageNames.includes(item));
            const job = self.jobs.get(jobId);
            const newItems = filteredItems.filter((filteredItem) => !job.stages.includes(filteredItem));
            if(newItems.length !== 0) {
                job.stages = job.stages.concat(newItems);
                self.jobs.set(jobId, job);
                db['job'].update({
                    status: `running-${newItems[0]}`
                }, {
                    where: {
                        jobId: job.id
                    }
                });
            }
        });
    }

    hookSocket(jobId, user_uuid) {
    }


}


module.exports = ResourceService;