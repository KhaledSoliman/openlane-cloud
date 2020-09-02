const redis = require('redis');
const logger = require('../log/logger')('Scheduler');
const Queue = require('bee-queue');
const db = require('../models');
const { v4: uuidv4 } = require('uuid');


class Scheduler {
    constructor(notification, resourceService, git) {
        //Services
        this.notification = notification;
        this.resourceService = resourceService;
        this.git = git;

        this.queue = new Queue('jobQueue');
        this.redisClient = redis.createClient();
        this.redisClient.on('error', function (err) {
            logger.error('Error ' + err)
        });
        const self = this;
        this.queue.process(process.env.JOB_CONCURRENCY || 10, async function (job, done) {
            /**
             * Stage: Cloning
             */
            logger.info(`Stage: Cloning | Job: ${job.id}`);
            db['job'].update({status: 'cloning'}, {where: {id: job.id}});
            if (job.data.notificationsEnabled) {
                this.notification.sendPushNotification('Job Scheduler', 'Your job repository is currently being cloned', job.data.regToken);
            }
            await this.git.cloneRepo(job.data.repoURL, job.id, job.data.designName).catch((error) => {
                throw new Error(error);
            });

            /**
             * Stage: Running
             */
            logger.info(`Stage: Running | Job: ${job.id}`);
            await db['job'].update({status: 'running'}, {where: {jobId: job.id}});
            if (job.data.notificationsEnabled) {
                self.notification.sendPushNotification('Job Scheduler', 'Your job is now running', job.data.regToken);
                self.notification.sendMail(job.data.email, `No-reply: Job #${job.id} processed`, `Job #${job.id} processed with repo url: ${job.data.repoURL}`);
            }
            return await self.resourceService.runJob(job.id, job.data);

        });
        logger.info('Scheduler Initialized');
    }

    async addJob(user_uuid, jobDescription) {
        //jobDescription.designName = `${uuid}-${jobDescription.repoURL.split('/').pop()}`;
        jobDescription.user_uuid = user_uuid;
        const job = this.queue.createJob(jobDescription);
        await job.setId(uuidv4()).retries(0).timeout(86400000).save();
        //db['job'].update({status: 'scheduled', jobId: job.id}, {where: {id: jobDbId}});
        if (jobDescription.notificationsEnabled) {
            this.notification.sendPushNotification('Job Scheduler', 'Your Job is now scheduled', jobDescription.regToken);
            this.notification.sendMail(job.data.email, `No-reply: Job #${job.id} submitted`, `Job #${job.id} submitted with repo url: ${job.data.repoURL}`);
        }
        await db['job'].create({
            jobId: job.id,
            user_uuid: jobDescription.user_uuid,
            designName: jobDescription.designName,
            repoURL: jobDescription.repoURL,
            type: jobDescription.type,
            pdkVariant: jobDescription.pdkVariant,
            notificationsEnabled: jobDescription.notificationsEnabled,
            status: 'submitted'
        });
        /**
         * Job Event Listeners
         */
        job.on('succeeded', async (stopped) => {
            //this.git.deleteRepo(job.id);
            /**
             * Stage: Completed
             */
            logger.info(`Success result for job ${job.id}: stopped=${stopped}`);
            if (stopped) {
                await db['run'].update({status: 'stopped'}, {where: {jobId: job.id}});
            } else {
                await db['job'].update({
                    status: 'completed',
                    completedAt: new Date().getTime()
                }, {
                    where: {jobId: job.id}
                });
            }
        });

        job.on('failed', async (result) => {
            /**
             * Stage: Failed
             */
            logger.error(`Failure result for job ${job.id}: ${result}`);
            await db['job'].update({status: 'failed'}, {where: {jobId: job.id}});
        });
    }

}

module.exports = Scheduler;