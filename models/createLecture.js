const { sequelize } = require('./index'); // now sequelize is the real instance
const { DataTypes } = require('sequelize');


// Import related models
const Program = require('./Program'); // adjust path if needed
const Year = require('./Year');
const Subject = require('./Subject');
const User = require('./User')
const CreateLecture = sequelize.define('CreateLecture', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  programid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Programs', key: 'id' },
  },
  yearid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Years', key: 'id' },
  },
  subjectid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Subjects', key: 'id' },
  },
  lecturerid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'id' },
  },
  lecturetype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  from_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  to_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'createlectures',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

// Each lecture belongs to one program, year, subject, and lecturer
// Associations
CreateLecture.belongsTo(Program, { foreignKey: 'programid', as: 'Program' });
CreateLecture.belongsTo(Year, { foreignKey: 'yearid', as: 'Year' });
CreateLecture.belongsTo(Subject, { foreignKey: 'subjectid', as: 'Subject' });
CreateLecture.belongsTo(User, { foreignKey: 'lecturerid', as: 'Lecturer' });
// Optional reverse associations
Program.hasMany(CreateLecture, { foreignKey: 'programid' });
Year.hasMany(CreateLecture, { foreignKey: 'yearid' });
Subject.hasMany(CreateLecture, { foreignKey: 'subjectid' });
User.hasMany(CreateLecture, { foreignKey: 'lecturerid' });


module.exports = CreateLecture;