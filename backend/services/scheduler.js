const redis = require('redis');
const logger = require('../log/logger');
const Queue = require('bee-queue');

class Scheduler {
    constructor() {
        this.queue = new Queue('jobQueue');
        this.redisClient = redis.createClient();
        this.redisClient.on('error', function (err) {
            logger.error('Error ' + err)
        });
        // Process jobs from as many servers or processes as you like
        this.queue.process(function (job, done) {
            logger.info(`Processing job ${job.id}`);
            return done(null, job.data.repoURL);
        });
        logger.info('Scheduler Initialized');
    }

    addJob(uid, jobDescription){
        const job = this.queue.createJob(jobDescription);
        job.on('succeeded', (result) => {
            logger.info(`Received result for job ${job.id}: ${result}`);
        });
        job.save().then((res) => {
            return res;
        });
    }

}

module.exports = Scheduler;