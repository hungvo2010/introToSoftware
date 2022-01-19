const sequelize = require('../utils/database');
const Sequelize = require('sequelize');
const Authenticator = sequelize.define('Authenticator', {
    email: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Authenticator;