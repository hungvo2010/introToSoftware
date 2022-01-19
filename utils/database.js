const Sequelize = require('sequelize');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../','.env')});

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
}, {
    define: {
       freezeTableName: true, 
    }
});

// const sequelize = new Sequelize(process.env.DB_PRODUCTION, {
//     dialect: 'mysql',
// }, {
//     define: {
//        freezeTableName: true, 
//     }
// });

module.exports = sequelize;