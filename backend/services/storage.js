const logger = require('../log/logger')('Storage');
const db = require('../models');
const fs = require('fs');
const archiver = require('archiver');

class Storage {
    constructor() {
    }

    zip() {
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
            logger.error(err);
        });
        archive.on('error', function(err) {
            logger.error(err);
        });
        archive.pipe(output);
        archive.directory('subdir/', 'new-subdir');
        archive.finalize();
    }
}

module.exports = Storage;