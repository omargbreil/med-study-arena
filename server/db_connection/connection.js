require('dotenv').config();
const { Sequelize } = require('sequelize');
const config = require("../config/config");
const mysql2= require("mysql2");

const password = config.password;
const username = config.username;
const database = config.database;
const host = config.host;
const dialect =  config.dialect;
const port = config.port

 const sequelize = new Sequelize(database,username, password, {
  host:host,
  dialect:dialect,
  dialectModule:mysql2,
  port:port
});
exports.connection = async () => {

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports.sequelize=sequelize






