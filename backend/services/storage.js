const logger = require('../log/logger')('Storage');
const db = require('../models');

class Storage {
    constructor() {
    }

    zip() {
        const fs = require('fs');
        const archiver = require('archiver');
        const output = fs.createWriteStream(__dirname + '/job.zip');
        const archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });
        output.on('close', function() {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
        });
        output.on('end', function() {
            console.log('Data has been drained');
        });
        archive.on('warning', function(err) {
            if (err.code === 'ENOENT') {
                // log warning
            } else {
                // throw error
                throw err;
            }
        });
        archive.on('error', function(err) {
            throw err;
        });
        archive.pipe(output);
        archive.directory('subdir/', 'new-subdir');
        archive.finalize();
    }
}

module.exports = Storage;