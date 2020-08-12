const Git = require('./git');
const Notification = require('./notification');
const Scheduler = require('./scheduler');
const {JobMonitoring} = require('./monitoring');
const ResourceService = require('./resources');
const StorageService = require('./storage');


const notification = new Notification();
const git = new Git();
const jobMonitoring = new JobMonitoring();
const resourceService = new ResourceService(jobMonitoring, notification);
const storageService = new StorageService();
const scheduler = new Scheduler(notification, storageService, resourceService, git);

module.exports = {
    notification,
    git,
    jobMonitoring,
    resourceService,
    storageService,
    scheduler,
};