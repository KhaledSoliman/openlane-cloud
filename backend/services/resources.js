const os = require('os');
const logger = require('../log/logger');

const cpuCount = os.cpus().length;
logger.warn(cpuCount);
logger.warn(os.totalmem()/(1024*1024*1024));


class ResourceService {
    constructor() {

    }

    updateCPU() {
        const cpuCount = os.cpus().length;
        logger.warn(cpuCount);
        logger.warn(os.totalmem()/(1024*1024*1024));
    }
}


module.exports = ResourceService;