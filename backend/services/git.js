const clone = require('git-clone');

class Git {
    cloneRepo() {
        clone(repo, targetPath, [options], cb);
    }
}

module.exports = Git;