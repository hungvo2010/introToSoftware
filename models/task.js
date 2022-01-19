const sequelize = require('../utils/database');
const Sequelize = require('Sequelize');
const Task = sequelize.define('Task', {
    taskId: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    idVolunteer: {
        type: Sequelize.STRING,
        allowNull: false,
        // references: 'User',
        // referencesKey: 'userId',
        // references: {
        //     model: 'Task',
        //     key: 'taskId',
        // }
    },
    idReceiver: {
        type: Sequelize.STRING,
        allowNull: false,
        // references: 'User',
        // referencesKey: 'userId',
        // references: {
        //     model: 'Task',
        //     key: 'taskId',
        // }
    },
    priority: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    lat: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    long: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    deadline: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isFinished: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    feedbackId: {
        type: Sequelize.STRING,
        // references: 'Feedback',
        // referencesKey: 'feedbackId',
        // references: {
        //     model: 'Feedback',
        //     key: 'feedbackId',
        // }
    },
});

module.exports = Task;