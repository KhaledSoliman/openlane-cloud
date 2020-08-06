const nodeMailer = require('nodemailer');
const logger = require('../log/logger')('Notification');
const admin = require('./firebase');

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
        this.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                logger.error(error);
            } else {
                logger.info('Email sent: ' + info.response);
            }
        });
    }

    sendPushNotification(title, body, token) {
        // const message = {
        //     notification: {
        //         title: title,
        //         body: body
        //     },
        //     token: token
        // };
        // admin.messaging().send(message)
        //     .then((response) => {
        //         logger.info('Successfully sent message:', response);
        //     })
        //     .catch((error) => {
        //         logger.error('Error sending message:', error);
        //     });
    }
}

module.exports = Notification;