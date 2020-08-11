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
            'running-synthesis',
            'running-floorplan',
            'running-placement',
            'running-cts',
            'running-routing',
            'running-lvs',
            'running-magic',
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