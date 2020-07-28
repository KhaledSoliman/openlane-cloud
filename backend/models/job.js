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
        repoURL: DataTypes.STRING,
        designName: DataTypes.STRING,
        jobId: DataTypes.INTEGER,
        status: DataTypes.ENUM('submitted', 'scheduled', 'running', 'completed', 'failed'),
        completedAt: {
            type: DataTypes.DATE,
            defaultValue: null
        }
    }, {
        sequelize,
        modelName: 'job',
    });
    return job;
};