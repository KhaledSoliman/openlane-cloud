'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class job extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    job.init({
        user_uuid: DataTypes.UUID,
        status: DataTypes.ENUM('submitted', 'running', 'done')
    }, {
        sequelize,
        modelName: 'job',
    });
    return job;
};