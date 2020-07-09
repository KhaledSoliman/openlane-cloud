const {createLogger, format, transports} = require('winston');
const {colorize, timestamp, simple, printf, label} = format;
const colorizer = colorize();

const logger = createLogger({
    level: 'debug',
    format: format.combine(
        label({label: 'Backend Service'}),
        timestamp(),
        simple(),
        printf(msg =>
            colorizer.colorize(msg.level, `[${msg.timestamp.replace('T', ' ').replace('Z', '')}] ${msg.label} - ${msg.level}: ${msg.message}`)
        ),
    ),
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new transports.Console(),
    ],
});

module.exports = logger;