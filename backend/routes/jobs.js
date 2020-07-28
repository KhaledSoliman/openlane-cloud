const express = require('express');
const router = express.Router();
const Scheduler = require('../services/scheduler');
const scheduler = new Scheduler();
const db = require('../models');
const logger = require('../log/logger')('Backend');
/**
 * Submit Job Request
 */
router.post('/', function (req, res, next) {
    req.body.job.designName = `${req.body.job.repoURL.split('/').pop()}`;
    db['job'].create({
        user_uuid: req.uid,
        designName: req.body.job.designName,
        repoURL: req.body.job.repoURL,
        status: 'submitted'
    }).then((job) => {
        scheduler.addJob(job.id, req.uid, req.body.job);
        res.sendStatus(200);
    });
});

router.get('/', function (req, res, next) {
    db['job'].findAll({ where: {
        user_uuid: req.uid
        }}).then((result) => {
        res.json(result);
    }).catch(logger.error) ;
});


module.exports = router;
