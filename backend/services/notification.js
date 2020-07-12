const nodeMailer = require('nodemailer');
const logger = require('../log/logger');


class Notification {
    constructor() {
        this.transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'youremail@gmail.com',
                pass: 'yourpassword'
            }
        });
    }

    sendMail(receiver, subject, body) {
        const mailOptions = {
            from: 'youremail@gmail.com',
            to: 'myfriend@yahoo.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
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