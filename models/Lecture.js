const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');

const Lecture = sequelize.define('Lecture', {
  subject: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  from_time: { type: DataTypes.TIME, allowNull: false },
  to_time: { type: DataTypes.TIME, allowNull: false },
  description: { type: DataTypes.TEXT },
});

Lecture.belongsTo(User, { as: 'lecturer', foreignKey: 'lecturerId' });

module.exports = Lecture;
