const { Attendance, createLecture, User, AttendanceSummary } = require("../models");
exports.markAttendance = async (req, res) => {
  try {
    const { lectureId, records } = req.body;
    const markedBy = req.user.id; // admin or lecturer
console.log('Marked By:', markedBy);  // 🔹 Add this debug line

    if (!lectureId || !records || !records.length) {
      return res.status(400).json({ message: "Lecture and records are required" });
    }

    // Remove old attendance for this lecture
    await Attendance.destroy({ where: { lectureId } });

    // Insert new attendance
    const attendanceData = records.map(r => ({
      lectureId,
      studentId: r.studentId,
      status: r.status,
      markedBy
    }));

    await Attendance.bulkCreate(attendanceData);

    res.status(201).json({ message: "Attendance marked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
const {   Subject } = require('../models/index');
const { Sequelize } = require('sequelize');



// Get attendance per student
exports.getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    const attendanceRecords = await Attendance.findAll({
      where: { studentId },
      include: [
        {
          model: createLecture,
          as: 'lecture',
attributes: ['id', 'date', 'from_time', 'to_time', 'subjectid', 'programid', 'yearid', 'lecturetype', 'location']
        },
        {
          model: User,
          as: 'student',
          attributes: ['id', 'name', 'email']
        }
      ],
      order: [['lectureId', 'ASC']]
    });

    if (attendanceRecords.length === 0) {
      return res.status(404).json({ message: "No attendance records found for this student" });
    }

    // Format response
    const formatted = attendanceRecords.map(record => ({
      attendanceId: record.id,
      studentId: record.student?.id,
      studentName: record.student?.name,
      lectureId: record.lecture?.id,
      subject: record.lecture?.subject,
      date: record.lecture?.date,
      time: `${record.lecture?.from_time} - ${record.lecture?.to_time}`,
      program: record.lecture?.program,
      year: record.lecture?.year,
      location: record.lecture?.location,
      status: record.status
    }));

    res.status(200).json({
      studentId,
      studentName: attendanceRecords[0]?.student?.name,
      totalLectures: attendanceRecords.length,
      totalPresent: attendanceRecords.filter(r => r.status === 'present').length,
      totalAbsent: attendanceRecords.filter(r => r.status === 'absent').length,
      records: formatted
    });
  } catch (err) {
    console.error("❌ Error fetching student attendance:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// controllers/attendanceController.jsconst { Attendance, createLecture, Subject } = require('../models');

exports.getStudentAttendanceSummary = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    // Fetch all attendance records for this student with lecture & subject info
    const attendanceRecords = await Attendance.findAll({
      where: { studentId },
      include: [
        {
          model: createLecture,
          as: 'lecture', // must match your association
          attributes: ['id', 'subjectId'],
          include: [
            {
              model: Subject,
              as: 'subjectDetail', // must match your association in createLecture
              attributes: ['id', 'name']
            }
          ]
        }
      ],
      order: [['lectureId', 'ASC']]
    });

    if (attendanceRecords.length === 0) {
      return res.status(404).json({ message: "No attendance found for this student" });
    }

    // Group attendance by subject
    const summaryMap = {};

    attendanceRecords.forEach(record => {
      const subjectName = record.lecture?.subjectDetail?.name || 'Unknown';

      if (!summaryMap[subjectName]) {
        summaryMap[subjectName] = { attended: 0, total: 0 };
      }

      summaryMap[subjectName].total += 1;
      if (record.status === 'present') {
        summaryMap[subjectName].attended += 1;
      }
    });

    // Format summary for response
    const summary = Object.keys(summaryMap).map(subject => ({
      subject,
      attended: summaryMap[subject].attended,
      total: summaryMap[subject].total,
      percentage: ((summaryMap[subject].attended / summaryMap[subject].total) * 100).toFixed(2)
    }));

    res.status(200).json({
      studentId,
      summary
    });

  } catch (err) {
    console.error("❌ Error fetching student summary:", err);
    res.status(500).json({ message: "Server error" });
  }
};




// Fetch lecture attendance (Admin)
exports.getLectureAttendance = async (req, res) => {
  try {
    const { lectureId } = req.params;

    const records = await Attendance.findAll({
      where: { lectureId },
      include: [{ model: User, attributes: ["name", "program", "year"], where: { role: "student" } }]
    });

    res.status(200).json({ lectureId, records });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
