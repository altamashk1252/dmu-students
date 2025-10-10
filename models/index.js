const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// ===================== DATABASE CONNECTION ===================== //
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false,
      }
    );

// ===================== MODELS ===================== //
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

const Lecture = sequelize.define('Lecture', {
  subject: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  from_time: { type: DataTypes.TIME, allowNull: false },
  to_time: { type: DataTypes.TIME, allowNull: false },
  description: { type: DataTypes.TEXT },
});

const Attendance = sequelize.define('Attendance', {
  lectureId: { type: DataTypes.INTEGER, allowNull: false, field: "lectureid" },
  studentId: { type: DataTypes.INTEGER, allowNull: false, field: "studentid" },
  markedBy: { type: DataTypes.INTEGER, allowNull: false, field: 'markedby' },
  status: { type: DataTypes.ENUM('present', 'absent'), allowNull: false }
}, {
  tableName: 'attendance',
  freezeTableName: true,
  timestamps: false
});

const Program = sequelize.define('Program', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.TEXT },
  duration: { type: DataTypes.INTEGER } // years
});

const Year = sequelize.define('Year', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  yearNumber: { type: DataTypes.INTEGER, allowNull: false },
  programId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Programs', key: 'id' } }
});

const Subject = sequelize.define('Subject', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  code: { type: DataTypes.STRING, allowNull: false, unique: true },
  credits: { type: DataTypes.INTEGER },
  yearId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Years', key: 'id' } },
  lecturerId: { type: DataTypes.INTEGER, references: { model: 'Lecturers', key: 'id' } }
});

const Lecturer = sequelize.define('Lecturer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  department: { type: DataTypes.STRING },
  qualification: { type: DataTypes.STRING },
  experience: { type: DataTypes.INTEGER }
});

const Event = sequelize.define('Event', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  image_url: { type: DataTypes.STRING },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  createdBy: { type: DataTypes.STRING, allowNull: false },
  creatorRole: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'events' });

const Announcement = sequelize.define('Announcement', {
  title: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING },
  subject: { type: DataTypes.STRING },
  image_url: { type: DataTypes.STRING },
  date: { type: DataTypes.DATEONLY },
  createdBy: { type: DataTypes.STRING },
  creatorRole: { type: DataTypes.STRING }
}, { tableName: 'announcements' });

const News = sequelize.define('News', {
  title: { type: DataTypes.STRING, allowNull: false },
  summary: { type: DataTypes.TEXT, allowNull: false },
  image_url: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE, allowNull: false },
  createdBy: { type: DataTypes.STRING, allowNull: false },
  creatorRole: { type: DataTypes.STRING, allowNull: false }
});

const createLecture = sequelize.define("createLecture", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  programId: { type: DataTypes.INTEGER, allowNull: false ,field: 'programid'},
  yearId: { type: DataTypes.INTEGER, allowNull: false,field: 'yearid' },
  subjectId: { type: DataTypes.INTEGER, allowNull: false,field: 'subjectid' },
  lecturerId: { type: DataTypes.INTEGER, allowNull: false,field: 'lectureid' },
  lecture_type: { type: DataTypes.STRING, allowNull: false ,field: 'lecturetype'},
  location: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  from_time: { type: DataTypes.TIME, allowNull: false },
  to_time: { type: DataTypes.TIME, allowNull: false },
  notes: { type: DataTypes.TEXT, allowNull: true },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: "createlectures", timestamps: false });

const AttendanceDetail = sequelize.define('AttendanceDetail', {
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  subjectId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  timeSlot: { type: DataTypes.STRING, allowNull: false },
  topic: { type: DataTypes.STRING },
  attended: { type: DataTypes.BOOLEAN, defaultValue: false }
});

const AttendanceSummary = sequelize.define('AttendanceSummary', {
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  subjectId: { type: DataTypes.INTEGER, allowNull: false },
  attendancePercent: { type: DataTypes.INTEGER, allowNull: false }
});

// ===================== ASSOCIATIONS ===================== //
// Program → Year
Program.hasMany(Year, { foreignKey: 'programId', as: 'years' });
Year.belongsTo(Program, { foreignKey: 'programId', as: 'program' });

// Year → Subject
Year.hasMany(Subject, { foreignKey: 'yearId', as: 'subjects' });
Subject.belongsTo(Year, { foreignKey: 'yearId', as: 'year' });

// Lecturer → Subject
Lecturer.hasMany(Subject, { foreignKey: 'lecturerId', as: 'subjects' });
Subject.belongsTo(Lecturer, { foreignKey: 'lecturerId', as: 'lecturer' });

// Attendance → User & createLecture
Attendance.belongsTo(User, { foreignKey: 'studentId', as: 'student' });
Attendance.belongsTo(User, { foreignKey: 'markedBy', as: 'markedByUser' });
Attendance.belongsTo(createLecture, { foreignKey: 'lectureid', as: 'lecture' });
createLecture.hasMany(Attendance, { foreignKey: 'lectureid', as: 'attendances' });

// createLecture → Subject & Lecturer
createLecture.belongsTo(Subject, { foreignKey: 'subjectid', as: 'subjectDetail' });
createLecture.belongsTo(User, { foreignKey: 'lecturerid', as: 'lecturerDetail' });


createLecture.belongsTo(Subject, { as: 'Subject', foreignKey: 'subjectid' });


// Optional: Lecture → User
Lecture.belongsTo(User, { as: 'lecturer', foreignKey: 'lecturerid' });

// AttendanceSummary → Subject
AttendanceSummary.belongsTo(Subject, {
  foreignKey: 'subjectid',
  as: 'subject'
});

// AttendanceSummary → User (student)
AttendanceSummary.belongsTo(User, {
  foreignKey: 'studentid',
  as: 'student'
});




// ===================== EXPORT ===================== //
module.exports = { 
  sequelize,
  User,
  Lecture,
  Attendance,
  Program,
  Year,
  Subject,
  Lecturer,
  Event,
  Announcement,
  News,
  createLecture,
  AttendanceDetail,
  AttendanceSummary
};
