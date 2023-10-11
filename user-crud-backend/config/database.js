// backend/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('user_crud_db', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
