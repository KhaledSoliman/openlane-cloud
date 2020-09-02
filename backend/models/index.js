'use strict';

const fs = require('fs');
const path = require('path');
const {Sequelize} = require('sequelize');
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
const logger = require('../log/logger')('Database');
const db = {};


let sequelize;
sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: logger.debug.bind(logger),
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

sequelize.sync({force: true});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
