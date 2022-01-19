const sequelize = require('../utils/database');
const Sequelize = require('Sequelize');
const Feedback = sequelize.define('Feedback', {
    feedbackId: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
        // references: 'User',
        // referencesKey: 'userId',
        // references: {
        //     model: 'User',
        //     key: 'userId',
        // }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Feedback;