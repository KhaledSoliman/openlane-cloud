const redis = require('redis');
const logger = require('../log/logger');
const Queue = require('bee-queue');
const queue = new Queue('example');

const job = queue.createJob({x: 2, y: 3});
job.save();
job.on('succeeded', (result) => {
    console.log(`Received result for job ${job.id}: ${result}`);
});

// Process jobs from as many servers or processes as you like
queue.process(function (job, done) {
    console.log(`Processing job ${job.id}`);
    return done(null, job.data.x + job.data.y);
});


class Scheduler {
    constructor() {
        const Queue = require('bee-queue');
        const queue = new Queue('example');

        const job = queue.createJob({x: 2, y: 3});
        job.save();
        job.on('succeeded', (result) => {
            console.log(`Received result for job ${job.id}: ${result}`);
        });

        // Process jobs from as many servers or processes as you like
        queue.process(function (job, done) {
            console.log(`Processing job ${job.id}`);
            return done(null, job.data.x + job.data.y);
        });

        this.redisClient = redis.createClient();
        this.redisClient.on('error', function (err) {
            logger.error('Error ' + err)
        });
        logger.info('Scheduler Initialized');
        this.workQueue = new Queue();
    }

    addJob(){

    }

}

module.exports = Scheduler;