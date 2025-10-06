const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const AttendanceSummary = sequelize.define('AttendanceSummary', {
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  subjectId: { type: DataTypes.INTEGER, allowNull: false },
  attendancePercent: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = AttendanceSummary;
