const Git = require('./git');
const Notification = require('./notification');
const Scheduler = require('./scheduler');
const {JobMonitoring} = require('./monitoring');
const ResourceService = require('./resources');
const StorageService = require('./storage');


const notification = new Notification();
const git = new Git();
const jobMonitoring = new JobMonitoring();
const storageService = new StorageService();
const resourceService = new ResourceService(jobMonitoring, storageService, notification);
const scheduler = new Scheduler(notification, resourceService, git);

module.exports = {
    notification,
    git,
    jobMonitoring,
    resourceService,
    storageService,
    scheduler,
};