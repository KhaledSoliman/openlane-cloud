const express = require('express');
const router = express.Router();
const db = require('../models');
const logger = require('../log/logger')('Backend');

router.get('/', function (req, res, next) {
    // var file = __dirname + '/upload-folder/dramaticpenguin.MOV';
    // var filename = path.basename(file);
    // var mimetype = mime.lookup(file);
    // res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    // res.setHeader('Content-type', mimetype);
    // var filestream = fs.createReadStream(file);
    // filestream.pipe(res);
    //
    // db['job'].findAll({ where: {
    //         user_uuid: req.uid
    //     }}).then((result) => {
    //     res.json(result);
    // }).catch(logger.error) ;
});

module.exports = router;