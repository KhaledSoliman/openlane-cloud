const logger = require('../log/logger')('Git');
const shell = require('shelljs');

class Git {
    constructor() {
        this.reposPath = './openlane/designs/';
        logger.info("Git service initialized");
    }

    async cloneRepo(repoURL, jobId, designName) {
        logger.info(`Cloning repository: ${repoURL}`);
        await shell.exec(`git clone ${repoURL} ${this.reposPath}/${jobId}-${designName}`);
    }

    deleteRepo(jobId) {
        logger.info(`removing repository: ${jobId}`);
    }
}

module.exports = Git;