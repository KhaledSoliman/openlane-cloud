const os = require('os');
const logger = require('../log/logger');
const shell = require('shelljs');
const admin = require('./firebase');
// const Pulsar = require('pulsar-client');




// Subscribe the devices corresponding to the registration tokens to the
// topic.

class ResourceService {
    constructor() {
        // this.client = new Pulsar.Client({
        //     serviceUrl: 'pulsar://localhost:6650',
        // });
    }

    updateCPU() {
        const cpuCount = os.cpus().length;
        logger.warn(cpuCount);
        logger.warn(os.totalmem()/(1024*1024*1024));
    }

    async runJob(designName, regToken) {
        logger.info("executing shell script...");
        await shell.exec(`./openlane-run.sh ${designName}`, async (code, out, err) => {
            if (err)
                logger.error(err);

            const message = {
                data: {
                    message: out
                },
                token: regToken
            };

            admin.messaging().send(message)
                .then((response) => {
                    // Response is a message ID string.
                    console.log('Successfully sent message:', response);
                })
                .catch((error) => {
                    console.log('Error sending message:', error);
                });
        });
    }
}


module.exports = ResourceService;