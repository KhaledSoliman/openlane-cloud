/**
 * Imports
 */
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const auth = require('./middleware/auth');
const cors = require('cors');
const Scheduler = require('./services/scheduler');
schedulerService = new Scheduler();
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
app.use(auth(allowUrl));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

/**
 * Routes
 */
app.use('/users', require('./routes/users'));

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
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.send(err.status || 500);
});

module.exports = app;
