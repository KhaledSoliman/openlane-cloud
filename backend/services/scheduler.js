const redis = require('redis');
const logger = require('../log/logger')('Scheduler');
const Queue = require('bee-queue');
const db = require('../models');


class Scheduler {
    constructor(notification, storage, resourceService, git) {
        //Services
        this.notification = notification;
        this.storage = storage;
        this.resourceService = resourceService;
        this.git = git;

        this.queue = new Queue('jobQueue');
        this.redisClient = redis.createClient();
        this.redisClient.on('error', function (err) {
            logger.error('Error ' + err)
        });
        // Process jobs from as many servers or processes as you like
        const self = this;
        this.queue.process(async function (job, done) {
            try {
                logger.info(`Processing job ${job.id}`);
                await db['job'].update({
                    status: 'running'
                }, {
                    where: {
                        jobId: job.id
                    }
                });
                //self.notification.sendPushNotification('Job Scheduler', 'Your job is now running', job.data.regToken);
                //self.notification.sendMail(job.data.email, `No-reply: Job #${job.id} processed` , `Job #${job.id} processed with repo url: ${job.data.repoURL}`);
                const result = await self.resourceService.runJob(job.id, job.data);
                if(result) {
                    await db['job'].update({
                        status: 'archiving'
                    }, {
                        where: {
                            jobId: job.id
                        }
                    });
                    await self.storage.zip(`${job.data.user_uuid}-${job.id}`, result);
                    await db['job'].update({
                        status: 'completed',
                        completedAt: new Date().getTime()
                    }, {
                        where: {
                            jobId: job.id
                        }
                    });
                } else {
                    await db['job'].update({
                        status: 'stopped'
                    }, {
                        where: {
                            jobId: job.id
                        }
                    });
                }
                return done(result, job.data.repoURL);
            } catch (e) {
                await db['job'].update({
                    status: 'failed'
                }, {
                    where: {
                        jobId: job.id
                    }
                });
                logger.error(e);
            }
        });
        logger.info('Scheduler Initialized');
    }

    addJob(jobDbId, uuid, jobDescription) {
        //jobDescription.designName = `${uuid}-${jobDescription.repoURL.split('/').pop()}`;
        jobDescription.user_uuid = uuid;
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
        //this.notification.sendPushNotification('Job Scheduler', 'Your job repository is currently being cloned', jobDescription.regToken);
        this.git.cloneRepo(jobDescription.repoURL, jobDescription.designName).then(() => {
            job.save().then((res) => {
                db['job'].update({status: 'scheduled', jobId: job.id}, {where: {id: jobDbId}});
                //this.notification.sendPushNotification('Job Scheduler', 'Your Job is now scheduled', jobDescription.regToken);
                //this.notification.sendMail(job.data.email, `No-reply: Job #${job.id} submitted` , `Job #${job.id} submitted with repo url: ${job.data.repoURL}`);
                return res;
            })
        });
    }

}

module.exports = Scheduler;