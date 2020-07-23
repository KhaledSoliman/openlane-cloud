const os = require('os');
const logger = require('../log/logger');
const shell = require('shelljs');
const Pulsar = require('pulsar-client');

const client = new Pulsar.Client({
    serviceUrl: 'pulsar://localhost:6650',
});

client.close();
class ResourceService {
    constructor() {

    }

    updateCPU() {
        const cpuCount = os.cpus().length;
        logger.warn(cpuCount);
        logger.warn(os.totalmem()/(1024*1024*1024));
    }

    async runJob(designName) {
        logger.info("executing shell script...");
        await shell.exec(`./openlane-run.sh ${designName}`, (code, out, err) => {
            if (err)
                logger.error(err);
            logger.info(out);
        });
    }
}


module.exports = ResourceService;