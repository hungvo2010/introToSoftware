const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Token = sequelize.define('Token', {
    email: {
        type: Sequelize.STRING,
        require: true,
        // references: 'Authenticator',
        // referencesKey: 'email',
        // references: {
        //     model: 'Authenticator',
        //     key: 'email',
        // }
    },
    token: {
        type: Sequelize.STRING,
        require: true,
    },
    expirationDate: {
        type: Sequelize.DATE,
        require: true,
        defaultValue: new Date(Date.now() + 300000),
    }
})

module.exports = Token;