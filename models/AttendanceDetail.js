const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const AttendanceDetail = sequelize.define('AttendanceDetail', {
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  subjectId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  timeSlot: { type: DataTypes.STRING, allowNull: false },
  topic: { type: DataTypes.STRING },
  attended: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = AttendanceDetail;
