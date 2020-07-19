const nodeMailer = require('nodemailer');
const logger = require('../log/logger');


class Notification {
    constructor() {
        this.transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kingsonlineforsoftware@gmail.com',
                pass: 'Walid112358@'
            }
        });
        logger.info("Notification service initialized");
    }

    sendMail(receiver, subject, body) {
        const mailOptions = {
            from: 'khaledsoli111@gmail.com',
            to: receiver,
            subject: subject,
            text: body
        };
        this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                logger.error(error);
            } else {
                logger.info('Email sent: ' + info.response);
            }
        });
    }
}

module.exports = Notification;