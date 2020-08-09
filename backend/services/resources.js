const os = require('os');
const logger = require('../log/logger')('Resources');
const shell = require('shelljs');
const admin = require('./firebase');
// const Pulsar = require('pulsar-client');
const {JobMonitoring} = require('./monitoring');
const Notification = require('./notification');


class ResourceService {
    constructor() {
        this.jobMonitoring = new JobMonitoring();
        // this.client = new Pulsar.Client({
        //     serviceUrl: 'pulsar://localhost:6650',
        // });
    }

    updateCPU() {
        const cpuCount = os.cpus().length;
        logger.warn(cpuCount);
        logger.warn(os.totalmem() / (1024 * 1024 * 1024));
    }

    async runJob(designName, regToken) {
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
        logger.info("executing shell script...");
        const child = shell.exec(`sudo ./openlane-run.sh ${designName}`, {async: true});
        const self = this;
        child.stdout.on('data', function (data) {
            logger.info('streaming data...');
            self.jobMonitoring.send(data);

        });
        child.stderr.on('data', function (error) {
            logger.error(error);
        });
        return new Promise(resolve => {
            child.on('exit', (c) => resolve(c));
        }).then();
    }


}


module.exports = ResourceService;