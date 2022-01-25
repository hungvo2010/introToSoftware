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
    }
}, {
    timestamps: false,
})

module.exports = Token;