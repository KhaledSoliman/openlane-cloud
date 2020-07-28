const redis = require('redis');
const logger = require('../log/logger')('Scheduler');
const Queue = require('bee-queue');
const Notification = require('./notification');
const db = require('../models');
const Git = require('./git');
const ResourceService = require('./resources');

class Scheduler {
    constructor() {
        this.git = new Git();
        this.queue = new Queue('jobQueue');
        this.notification = new Notification();
        this.resourceService = new ResourceService();
        this.redisClient = redis.createClient();
        this.redisClient.on('error', function (err) {
            logger.error('Error ' + err)
        });
        // Process jobs from as many servers or processes as you like
        const self = this;
        this.queue.process(async function (job, done) {
            try {
                logger.info(`Processing job ${job.id}`);
                db['job'].update({
                    status: 'running'
                }, {
                    where: {
                        jobId: job.id
                    }
                });
                self.notification.sendPushNotification('Job Scheduler', 'Your job is now running', job.data.regToken);
                //self.notification.sendMail(job.data.email, `No-reply: Job #${job.id} processed` , `Job #${job.id} processed with repo url: ${job.data.repoURL}`);
                await self.resourceService.runJob(job.data.designName, job.data.regToken);
                return done(null, job.data.repoURL);
            } catch (e) {
                logger.error(e);
            }
        });
        logger.info('Scheduler Initialized');
    }

    addJob(jobDbId, uuid, jobDescription) {
        //jobDescription.designName = `${uuid}-${jobDescription.repoURL.split('/').pop()}`;
        const job = this.queue.createJob(jobDescription);
        /**
         * Event Listeners
         */
        job.on('succeeded', (result) => {
            //this.git.deleteRepo(job.id);
            logger.info(`Received result for job ${job.id}: ${result}`);
        });
        job.on('failed', () => {

        });
        db['job'].update({status: 'cloning'}, {where: {id: jobDbId}});
        this.notification.sendPushNotification('Job Scheduler', 'Your job repository is currently being cloned', jobDescription.regToken);
        this.git.cloneRepo(jobDescription.repoURL, jobDescription.designName).then(() => {
            job.save().then((res) => {
                db['job'].update({status: 'scheduled', jobId: job.id}, {where: {id: jobDbId}});
                this.notification.sendPushNotification('Job Scheduler', 'Your Job is now scheduled', jobDescription.regToken);
                //this.notification.sendMail(job.data.email, `No-reply: Job #${job.id} submitted` , `Job #${job.id} submitted with repo url: ${job.data.repoURL}`);
                return res;
            })
        });
    }

}

module.exports = Scheduler;