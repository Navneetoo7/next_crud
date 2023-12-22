const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const Role = require('./Role'); // Correct import statement

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
  },
});

User.belongsTo(Role, {
  foreignKey: 'roleId',
  onDelete: 'SET NULL',
});
Role.hasMany(User);

module.exports = User;
