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
            models['job'].hasMany(models['run'], {
                as: 'runs',
                foreignKey: {
                    allowNull: false
                },
                sourceKey: 'jobId'
            });
            // define association here
        }
    };
    job.init({
        user_uuid: DataTypes.UUID,
        repoURL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        designName: DataTypes.STRING,
        jobId: {
            type: DataTypes.INTEGER,
            unique: true
        },
        type: DataTypes.ENUM(
            'normal',
            'exploratory'
        ),
        status: DataTypes.ENUM(
            'submitted',
            'scheduled',
            'running',
            'archiving',
            'completed',
            'stopping',
            'stopped',
            'failed'
        ),
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