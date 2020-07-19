const redis = require('redis');
const logger = require('../log/logger');
const Queue = require('bee-queue');
const Notification = require('./notification');
const db = require('../models');
require('./resources');

class Scheduler {
    constructor() {
        this.queue = new Queue('jobQueue');
        this.notification = new Notification();
        this.redisClient = redis.createClient();
        this.redisClient.on('error', function (err) {
            logger.error('Error ' + err)
        });
        // Process jobs from as many servers or processes as you like
        const self = this;
        this.queue.process(function (job, done) {
            logger.info(`Processing job ${job.id}`);
            //self.notification.sendMail(job.data.email, `No-reply: Job #${job.id} processed` , `Job #${job.id} processed with repo url: ${job.data.repoURL}`);
            return done(null, job.data.repoURL);
        });
        logger.info('Scheduler Initialized');
    }

    addJob(uuid, jobDescription){
        const job = this.queue.createJob(jobDescription);
        job.on('succeeded', (result) => {
            logger.info(`Received result for job ${job.id}: ${result}`);
        });
        job.save().then((res) => {
            //this.notification.sendMail(job.data.email, `No-reply: Job #${job.id} submitted` , `Job #${job.id} submitted with repo url: ${job.data.repoURL}`);
            return res;
        });
        db['job'].create({
            user_uuid: uuid,
            status: 'submitted'
        });
    }

}

module.exports = Scheduler;