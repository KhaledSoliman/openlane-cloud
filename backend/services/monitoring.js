'use strict';
const logger = require('../log/logger')('Monitoring');
const WebSocket = require('ws');
const http = require('http');
const admin = require('./firebase');

class JobMonitoring {
    constructor() {
        this.server = http.createServer();
        this.wss = new WebSocket.Server({noServer: true, clientTracking: false});
        this.map = new Map();
        let self = this;
        this.wss.on('connection', (ws, request, user_uuid) => {
            self.map.set(user_uuid, ws);
            logger.info(`Added User on WS: ${user_uuid}`);
            ws.on('close', function () {
                logger.info(`Removed User on WS: ${user_uuid}`);
                self.map.delete(user_uuid);
            });
        });
        this.server.on('upgrade', async (request, socket, head) => {
            let user_uuid;
            try {
                await admin.auth().verifyIdToken(request.headers['sec-websocket-protocol'])
                    .then(function (decodedToken) {
                        user_uuid = decodedToken.uid;
                        logger.info(`Authenticated User on WS: ${user_uuid}`);
                    }).catch(function (error) {
                        throw error;
                    });
                self.wss.handleUpgrade(request, socket, head, (ws) => {
                    self.wss.emit('connection', ws, request, user_uuid);
                });
            } catch (error) {
                logger.info(`Failed to authenticated user on WS with token: ${request.headers['sec-websocket-protocol']}`);
                socket.write(`HTTP/1.1 401 ${http.STATUS_CODES[401]}\r\n\r\n`);
                socket.destroy();
                return;
            }
        });
        this.server.listen(8080, function () {
            logger.info('Listening on http://localhost:8080');
        });
        logger.info("Job Monitoring service initialized");
    }

    sendBroadcast(data) {
        this.map.forEach((ws) => {
            ws.send(data);
        })
    }

    send(user_uuid, data) {
        logger.info(user_uuid);
        const ws = this.map.get(user_uuid);
        if (ws) {
            ws.send(data);
            logger.info(`Sent message to user on WS: ${user_uuid}`);
        }
    }

}


module.exports = {JobMonitoring};