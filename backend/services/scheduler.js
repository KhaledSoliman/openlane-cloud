const redis = require('redis');
const logger = require('../log/logger');
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
                //self.notification.sendMail(job.data.email, `No-reply: Job #${job.id} processed` , `Job #${job.id} processed with repo url: ${job.data.repoURL}`);
                await self.resourceService.runJob(job.data.designName);
                return done(null, job.data.repoURL);
            } catch (e) {
                logger.error(e);
            }
        });
        logger.info('Scheduler Initialized');
    }

    addJob(uuid, jobDescription) {
        //jobDescription.designName = `${uuid}-${jobDescription.repoURL.split('/').pop()}`;
        jobDescription.designName = `${jobDescription.repoURL.split('/').pop()}`;
        const job = this.queue.createJob(jobDescription);
        job.on('succeeded', (result) => {
            //this.git.deleteRepo(job.id);
            logger.info(`Received result for job ${job.id}: ${result}`);
        });
        this.git.cloneRepo(jobDescription.repoURL, jobDescription.designName).then(() => {
            job.save().then((res) => {
                //this.notification.sendMail(job.data.email, `No-reply: Job #${job.id} submitted` , `Job #${job.id} submitted with repo url: ${job.data.repoURL}`);
                return res;
            })
        });
        db['job'].create({
            user_uuid: uuid,
            status: 'submitted'
        });
    }

}

module.exports = Scheduler;