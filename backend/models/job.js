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
        repoURL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        designName: DataTypes.STRING,
        jobId: {
            type: DataTypes.INTEGER,
            unique: true
        },
        status: DataTypes.ENUM(
            'submitted',
            'scheduled',
            'running',
            'running-cts',
            'running-floorplan',
            'running-lvs',
            'running-magic',
            'running-placement',
            'running-routing',
            'running-synthesis',
            'archiving',
            'completed',
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