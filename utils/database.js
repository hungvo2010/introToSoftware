const Sequelize = require('sequelize');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../','.env')});

const sequelize = new Sequelize(process.env.DB_MYSQL_PRODUCTION, {
    dialect: 'mysql',
}, {
    define: {
       freezeTableName: true, 
    }
});

module.exports = sequelize;