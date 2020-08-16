const express = require('express');
const router = express.Router();
const db = require('../models');
const logger = require('../log/logger')('Backend');
const {scheduler, resourceService} = require('../services');
/**
 * Submit Job Request
 */
router.post('/', function (req, res, next) {
    db['job'].create({
        user_uuid: req.uid,
        designName: req.body.job.designName,
        repoURL: req.body.job.repoURL,
        type: req.body.job.type,
        status: 'submitted'
    }).then((job) => {
        scheduler.addJob(job.id, req.uid, req.body.job);
        res.sendStatus(200);
    });
});

router.get('/', function (req, res, next) {
    db['job'].findAll({
        where: {
            user_uuid: req.uid
        }
    }).then((result) => {
        res.json(result);
    }).catch(logger.error);
});

router.get('/job-monitoring', function (req, res, next) {
    resourceService.hookSocket(req.query.jobId, req.uid);
    res.sendStatus(200);
});

router.post('/quit', function (req, res, next) {
    db['job'].findOne({
        where: {
            jobId: req.body.job.jobId,
            user_uuid: req.uid
        }
    }).then((result) => {
        if (result) {
            resourceService.quitProcess(req.body.job.jobId);
        } else {
            res.sendStatus(401);
        }
    }).catch(logger.error);
});

module.exports = router;
