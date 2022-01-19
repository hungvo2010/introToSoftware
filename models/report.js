const sequelize = require('../utils/database');
const Sequelize = require('Sequelize');
const Report = sequelize.define('Report', {
    reportId: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
        // references: 'User',
        // referencesKey: 'userId',
        // references: {
        //     model: 'Task',
        //     key: 'taskId',
        // }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    reportedUserId: {
        type: Sequelize.STRING,
        allowNull: false,
        // references: 'User',
        // referencesKey: 'userId',
        // references: {
        //     model: 'Task',
        //     key: 'taskId',
        // }
    }
});

module.exports = Report;