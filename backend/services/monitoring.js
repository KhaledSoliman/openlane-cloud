const logger = require('../log/logger');
const WebSocket = require('ws');

class JobMonitoring {
    constructor() {
        this.wss = new WebSocket.Server({ port: 8080 });
        let self = this;
        this.websockets = [];
        this.wss.on('connection', function connection(ws) {
            self.websockets.push(ws);
        });
        this.wss.on('listening', function connection(ws) {
            self.websocket = ws;
            logger.info('Connected to websocket');
        });
    }

    send(data) {
        this.websockets.forEach((ws) => {
           ws.send(data);
        })
    }

}


module.exports = {JobMonitoring};