const logger = require('../log/logger')('Git');
const shell = require('shelljs');

class Git {
    constructor() {
        this.reposPath = './openlane/designs/';
    }

    async cloneRepo(repoURL, designName) {
        logger.info(`Cloning repository: ${repoURL}`);
        await shell.exec(`git clone ${repoURL} ${this.reposPath}/${designName}`);
    }

    deleteRepo(jobId) {
        logger.info(`removing repository: ${jobId}`);
    }
}

module.exports = Git;