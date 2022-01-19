const sequelize = require('../utils/database');
const Sequelize = require('sequelize');
const Chat = sequelize.define('Chat', {
    idSender: {
        type: Sequelize.STRING,
        primaryKey: true,
        // references: 'User',
        // referencesKey: 'userId',
        // references: {
        //     model: 'User',
        //     key: 'userId',
        // }
    },
    idReceiver: {
        type: Sequelize.STRING,
        primaryKey: true,
        // references: 'User',
        // referencesKey: 'userId',
        // references: {
        //     model: 'User',
        //     key: 'userId',
        // }
    },
    message: {
        type: Sequelize.STRING,
    },
    time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        primaryKey: true,
    }
}, {
    timestamps: false,
});

module.exports = Chat;