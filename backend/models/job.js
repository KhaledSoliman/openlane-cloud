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
                foreignKey: 'jobId',
                sourceKey: 'jobId'
            });
            // define association here
        }
    };
    job.init({
        jobId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        user_uuid: {
            type: DataTypes.UUID,
            allowNull: false
        },
        repoURL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        designName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pdkVariant: {
            type: DataTypes.ENUM(
                'sky130_fd_sc_hd',
                'sky130_fd_sc_hs',
                'sky130_fd_sc_ms',
                'sky130_fd_sc_ls',
                'sky130_fd_sc_hdll',
            ),
            allowNull: false,
            defaultValue: 'sky130_fd_sc_hd'
        },
        notificationEnabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        type: {
            type: DataTypes.ENUM(
                'normal',
                'exploratory'
            ),
            allowNull: false,
            defaultValue: 'normal'
        },
        status: {
            type: DataTypes.ENUM(
                'submitted',
                'scheduled',
                'running',
                'archiving',
                'completed',
                'stopping',
                'stopped',
                'failed'
            ),
            allowNull: false,
            defaultValue: 'submitted'
        },
        completedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    }, {
        sequelize,
        modelName: 'job',
    });
    return job;
};