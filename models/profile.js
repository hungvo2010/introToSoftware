const sequelize = require('../utils/database');
const Sequelize = require('sequelize');
const Profile = sequelize.define('Profile', {
    userId: {
        type: Sequelize.STRING,
        primaryKey: true,
        // references: 'User',
        // referencesKey: 'userId',
        // references: {
        //     model: 'Task',
        //     key: 'taskId',
        // }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    favoriteTask: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    availableTime: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    avatarUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Profile;