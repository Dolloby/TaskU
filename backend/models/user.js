const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importa tu conexión de Sequelize
const { hash } = require('bcryptjs');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  pass: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;