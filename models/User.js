const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
  subject: { type: DataTypes.STRING },
  program: { type: DataTypes.STRING },
  year: { type: DataTypes.INTEGER },
  admissionYear: { type: DataTypes.INTEGER },
  category: { type: DataTypes.STRING },
  dob: { type: DataTypes.DATEONLY },
  mobile: { type: DataTypes.STRING },
  guardianMobile: { type: DataTypes.STRING },
});


module.exports = User;
