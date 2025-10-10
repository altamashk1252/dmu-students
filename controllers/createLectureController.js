const { sequelize } = require('../models/index.js'); 

const Lecture = require("../models/createLecture");
const Program = require("../models/Program");
const Year = require("../models/Year");
const Subject = require("../models/Subject");
const User = require("../models/User");
// Create / schedule lecture
exports.scheduleLecture = async (req, res) => {
  try {
    const { programid, yearid, subjectid, lecturerid, lecturetype, location, date, from_time, to_time, notes } = req.body;

    if (!programid || !yearid || !subjectid || !lecturerid || !lecturetype || !location || !date || !from_time || !to_time) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    const lecture = await Lecture.create({   // ✅ Use Lecture here
      programid,
      yearid,
      subjectid,
      lecturerid,
      lecturetype,
      location,
      date,
      from_time,
      to_time,
      notes,
    });

    return res.status(201).json({ message: "Lecture scheduled successfully", lecture });
  } catch (err) {
    console.error("❌ Error scheduling lecture:", err);
    res.status(500).json({ message: "Server error" });
  }
};
const { Op } = require("sequelize"); // import Sequelize operators

// Get lectures (role-based, with related info)
exports.getLectures = async (req, res) => {
  try {
    const { role, programid, yearid, subjectid, lecturerid, startDate, endDate } = req.body;

    const filter = {};

    // Role-based filters
    if (role === "student") {
      if (!programid || !yearid) {
        return res.status(400).json({ message: "ProgramId and YearId required for students" });
      }
      filter.programid = programid;
      filter.yearid = yearid;
    } else {
      if (programid) filter.programid = programid;
      if (yearid) filter.yearid = yearid;
      if (subjectid) filter.subjectid = subjectid;
      if (lecturerid) filter.lecturerid = lecturerid;
    }

    // Date filter
    if (startDate && endDate) {
      filter.date = { [Op.between]: [startDate, endDate] };
    } else if (startDate) {
      filter.date = { [Op.gte]: startDate }; // from startDate onwards
    } else if (endDate) {
      filter.date = { [Op.lte]: endDate }; // up to endDate
    }

    const lectures = await Lecture.findAll({
      where: filter,
      include: [
        { model: Program, as: 'Program', attributes: ['id', 'name'] },
        { model: Year, as: 'Year', attributes: ['id', 'yearNumber'] },
        { model: Subject, as: 'Subject', attributes: ['id', 'name'] },
        { model: User, as: 'Lecturer', attributes: ['id', 'name'] },
      ],
      order: [["date", "ASC"], ["from_time", "ASC"]],
    });

    const formattedLectures = lectures.map(l => ({
      id: l.id,
      programId: l.programid,
      yearId: l.yearid,
      subjectId: l.subjectid,
      lecturerId: l.lecturerid,
      lectureType: l.lecturetype,
      location: l.location,
      date: l.date,
      from_time: l.from_time,
      to_time: l.to_time,
      notes: l.notes,
      programName: l.Program?.name,
      yearNumber: l.Year?.yearNumber,
      subjectName: l.Subject?.name,
      lecturerName: l.Lecturer?.name,
    }));

    res.status(200).json({ lectures: formattedLectures });
  } catch (err) {
    console.error("Error fetching lectures:", err);
    res.status(500).json({ message: "Server error" });
  }
};
