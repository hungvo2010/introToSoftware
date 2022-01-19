'use strict';

const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config({path: path.join(__dirname, '../', '.env')});
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

module.exports = sequelize;
