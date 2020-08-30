const express = require('express');
const mime = require('mime');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const db = require('../models');
const logger = require('../log/logger')('Backend');

router.get('/', function (req, res, next) {
    try {
        const file = `./downloads/${req.uid}-${req.query.jobId}-${req.query.runName}.zip`;
        const filename = path.basename(file);
        const mimetype = mime.getType(file);
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);
        const filestream = fs.createReadStream(file);
        filestream.pipe(res);
    } catch (e) {
        console.log(e);
    }

    // db['job'].findAll({ where: {
    //         user_uuid: req.uid
    //     }}).then((result) => {
    //     res.json(result);
    // }).catch(logger.error) ;
});

module.exports = router;