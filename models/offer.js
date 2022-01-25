const sequelize = require('../utils/database');
const Sequelize = require('sequelize');
const Offer = sequelize.define('Offer', {
    idTask: {
        type: Sequelize.STRING,
        primaryKey: true,
        // references: 'Task',
        // referencesKey: 'taskId',
        // references: {
        //     model: 'Task',
        //     key: 'taskId',
        // }
    },
    volunteerId: {
        type: Sequelize.STRING,
        primaryKey: true,
        // references: 'User',
        // referencesKey: 'userId',
        // references: {
        //     model: 'User',
        //     key: 'userId',
        // }
    }
}, {
    timestamps: false,
});

module.exports = Offer;