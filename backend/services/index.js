const Git = require('./git');
const Notification = require('./notification');
const Scheduler = require('./scheduler');
const {JobMonitoring} = require('./monitoring');
const ResourceService = require('./resources');
const StorageService = require('./storage');


let notification;
let git;
let jobMonitoring;
let resourceService;
let storageService;
let scheduler;

function init() {
    notification = new Notification();
    git = new Git();
    jobMonitoring = new JobMonitoring();
    resourceService = new ResourceService(jobMonitoring);
    storageService = new StorageService();
    scheduler = new Scheduler(notification, storageService, resourceService, git);
}

module.exports = {
    notification,
    git,
    jobMonitoring,
    resourceService,
    storageService,
    scheduler,
    init
};