/**
 * Imports
 */
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const winstonLogger =require('./log/logger')('Backend');
const auth = require('./middleware/auth');
const cors = require('cors');
const corsOptions = {
    origin: (origin, cb) => {
        cb(null, true)
    }
};
const allowUrl = ['public', 'downloads'];
const app = express();

/**
 * Middleware
 */
app.use(cors(corsOptions));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(auth(allowUrl));

/**
 * Routes
 */
app.use('/jobs', require('./routes/jobs'));
app.use('/download', require('./routes/download'));


/**
 * Catch 404 and forward to error handler
 */
app.use(function (req, res, next) {
    next(createError(404));
});

/**
 * Error handler
 */
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    winstonLogger.error(err);
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.sendStatus(err.status || 500);
});

module.exports = app;
