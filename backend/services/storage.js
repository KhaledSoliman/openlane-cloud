const logger = require('../log/logger')('Storage');
const db = require('../models');
const fs = require('fs');
const archiver = require('archiver');

class Storage {
    constructor() {
        logger.info("Storage Service Initialized");
    }

    zip(uuid, path) {
        const outputPath = './downloads/'+ uuid + '.zip';
        logger.info(outputPath);
        const output = fs.createWriteStream( outputPath);
        const archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });
        output.on('close', function() {
            logger.info(archive.pointer() + ' total bytes');
            logger.info('archiver has been finalized and the output file descriptor has closed.');
        });
        output.on('end', function() {
            logger.info('Data has been drained');
        });
        archive.on('warning', function(err) {
            logger.error(err);
        });
        archive.on('error', function(err) {
            logger.error(err);
        });
        archive.pipe(output);
        archive.directory(path, false).finalize();
    }
}

module.exports = Storage;