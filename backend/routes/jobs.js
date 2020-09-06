const express = require('express');
const router = express.Router();
const db = require('../models');
const logger = require('../log/logger')('Backend');
const {scheduler, resourceService} = require('../services');
const csv = require('csv-parser');
const fs = require('fs');


/**
 * Submit Job Request
 */
router.post('/', function (req, res, next) {
    scheduler.addJob(req.uid, req.body.job).then(() => {
        res.sendStatus(200);
    }).catch((err) => {
        logger.error(err);
        res.sendStatus(500);
    });
});

/**
 * Get jobs
 */
router.get('/', function (req, res, next) {
    if (req.query.jobId) {
        db['job'].findOne({
            include: 'runs',
            where: {
                user_uuid: req.uid,
                jobId: req.query.jobId
            }
        }).then((result) => {
            res.json(result);
        }).catch((err) => {
            logger.error(err);
            res.sendStatus(500);
        });
    } else {
        db['job'].findAndCountAll({
            where: {
                user_uuid: req.uid
            },
            limit: req.query.limit | 500,
            offset: req.query.offset | 0,
        }).then((result) => {
            res.json(result);
        }).catch((err) => {
            logger.error(err);
            res.sendStatus(500);
        });
    }
});

router.get('/job-monitoring', function (req, res, next) {
    resourceService.hookSocket(req.query.jobId, req.uid);
    res.sendStatus(200);
});

router.get('/report', function (req, res, next) {
    if (req.query.jobId) {
        try {
            let results = [];
            fs.createReadStream(`./reports/${req.query.jobId}.csv`)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    console.log(results);
                    res.json(results);
                });
        } catch (e) {
            console.log(e);
        }
    }
});

router.post('/quit', function (req, res, next) {
    db['job'].findOne({
        where: {
            jobId: req.body.job.jobId,
            user_uuid: req.uid
        }
    }).then((result) => {
        if (result) {
            resourceService.quitProcess(req.body.job.jobId).then(() => {
                res.sendStatus(200);
            });
        } else {
            res.sendStatus(401);
        }
    }).catch((err) => {
        logger.error(err);
        res.sendStatus(500);
    });
});

router.post('/delete', function (req, res, next) {
    db['job'].destroy({
        where: {
            jobId: req.body.job.jobId,
        }
    }).then((result) => {
        if (result) {
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    }).catch((err) => {
        logger.error(err);
        res.sendStatus(500);
    });
});

module.exports = router;
