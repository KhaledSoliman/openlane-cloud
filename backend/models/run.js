'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class run extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            models['run'].belongsTo(models['job']);
        }
    }
    run.init({
        name: DataTypes.STRING,
        status: DataTypes.ENUM(
            'running',
            'running-synthesis',
            'running-floorplan',
            'running-placement',
            'running-cts',
            'running-routing',
            'running-lvs',
            'running-magic',
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
        modelName: 'run',
    });
    return job;
};