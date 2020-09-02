const logger = require('../log/logger')('Git');
const shell = require('shelljs');
const fs = require('fs');

class Git {
    constructor() {
        this.reposPath = './openlane_working_dir/openlane/designs';
        logger.info("Git service initialized");
    }

    async cloneRepo(repoURL, jobId, designName) {
        logger.info(`Cloning repository: ${repoURL}`);
        await shell.exec(`git clone ${repoURL} ${this.reposPath}/${jobId}-${designName}`);
        const data = fs.readFileSync(`${this.reposPath}/${jobId}-${designName}/config.tcl`, 'utf-8');
        const newValue = data.replace(/^(set ::env\(VERILOG_FILES\) \[glob \$::env\(OPENLANE_ROOT\)\/designs\/).+(\/src\/\*\.v])$/gm, `$1${jobId}-${designName}$2`);
        fs.writeFileSync(`${this.reposPath}/${jobId}-${designName}/config.tcl`, newValue, 'utf-8');
    }

    async deleteRepo(jobId, designName) {
        logger.info(`removing repository: ${jobId}`);
        await shell.rm('-rf', `${this.reposPath}/${jobId}-${designName}`);
    }
}

module.exports = Git;