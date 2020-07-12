const express = require('express');
const router = express.Router();
const Scheduler = require('../services/scheduler');
const scheduler = new Scheduler();

/**
 * Submit Job Request
 */
router.post('/', function (req, res, next) {
    res.send(scheduler.addJob(req.uid, req.body.job));
});

module.exports = router;
