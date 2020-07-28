const winston = require('winston');
const {colorize, timestamp, simple, printf, label} = winston.format;
const colorizer = colorize();

const services = ['Backend', 'Database', 'Notification', 'Scheduler', 'Resources', 'Storage', 'Monitoring', 'Git'];

services.forEach((serviceName) => {
    winston.loggers.add(serviceName, {
        level: 'debug',
        format: winston.format.combine(
            label({label: serviceName}),
            timestamp(),
            simple(),
            printf(msg =>
                colorizer.colorize(msg.level, `[${msg.timestamp.replace('T', ' ').replace('Z', '')}] ${msg.label} - ${msg.level}: ${msg.message}`)
            ),
        ),
        transports: [
            new winston.transports.Console(),
        ],
    });
});

module.exports = (serviceName) => {
    return winston.loggers.get(serviceName);
};