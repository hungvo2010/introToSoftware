const Sequelize = require('sequelize');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../','.env')});

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mysql',
    port: process.env.DB_PORT,
}, {
    define: {
       freezeTableName: true, 
    }
});

module.exports = sequelize;