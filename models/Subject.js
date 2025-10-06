const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Subject = sequelize.define('Subject', {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
});

module.exports = Subject;
