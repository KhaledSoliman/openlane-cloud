const clone = require('git-clone');
const logger = require('../log/logger');
const del = require('del');
const shell = require('shelljs');

class Git {
    constructor() {
        this.reposPath = './openlane.alpha-16/designs/';
    }

    async cloneRepo(repoURL, designName) {
        logger.info(`Cloning repository: ${repoURL}`);
        await shell.exec(`git clone ${repoURL} ${this.reposPath}/${designName}`);
    }

    deleteRepo(jobId) {
        logger.info(`removing repository: ${jobId}`);
        del(`${this.reposPath}/${jobId}/`).then(() => {
            logger.info(`Successfully deleted repository for ${jobId}`);
        }).catch(logger.info);
    }
}

module.exports = Git;