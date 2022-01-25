const sequelize = require('../utils/database');
const Sequelize = require('sequelize');
const User = sequelize.define('User', {
    userId: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        // references: 'Authenticator',
        // referencesKey: 'email',
        // references: {
        //     model: 'Authenticator',
        //     key: 'email',
        // }
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    mode: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1, // 0: Volunteer, 1: Handicapped
    }
}, {
    timestamps: false,
});

module.exports = User;