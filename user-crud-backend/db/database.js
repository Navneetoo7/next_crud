const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'testServer',
  username: 'postgres',
  password: 'root',
  host: 'localhost', // or the host where your PostgreSQL server is running
  port: 5433, // Verify the port
  dialect: 'postgres',
});

module.exports = sequelize;
