const logger = require('../log/logger')('Git');
const shell = require('shelljs');

class Git {
    constructor() {
        this.reposPath = './openlane_working_dir/openlane/designs/';
        logger.info("Git service initialized");
    }

    async cloneRepo(repoURL, jobId, designName) {
        logger.info(`Cloning repository: ${repoURL}`);
        await shell.exec(`git clone ${repoURL} ${this.reposPath}/${jobId}-${designName}`);
    }

    async deleteRepo(jobId, designName) {
        logger.info(`removing repository: ${jobId}`);
        await shell.rm('-rf', `${this.reposPath}/${jobId}-${designName}`);
    }
}

module.exports = Git;