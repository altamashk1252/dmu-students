const AttendanceSummary = require('../models/AttendanceSummary');
const AttendanceDetail = require('../models/AttendanceDetail');
const Subject = require('../models/Subject');

// -----------------------------
// Get attendance summary for a student
// -----------------------------
exports.getAttendanceSummary = async (req, res) => {
  try {
    const { studentId } = req.params;
    const summary = await AttendanceSummary.findAll({
      where: { studentId },
      include: [{ model: Subject, attributes: ['id', 'name'] }]
    });

    res.json(
      summary.map(item => ({
        subjectId: item.Subject.id,       // include ID for front-end
        subject: item.Subject.name,
        percent: item.attendancePercent
      }))
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -----------------------------
// Get detailed attendance by subjectId
// -----------------------------
exports.getAttendanceDetails = async (req, res) => {
  try {
    const { studentId, subjectId } = req.params;

    const subject = await Subject.findByPk(subjectId);
    if (!subject) return res.status(404).json({ message: 'Subject not found' });

    const details = await AttendanceDetail.findAll({
      where: { studentId, subjectId }
    });

    if (!details.length) {
      return res.status(404).json({ message: 'No attendance records found' });
    }

    const response = {};
    details.forEach(item => {
      if (!response[item.date]) response[item.date] = [];
      response[item.date].push({
        time: item.timeSlot,
        topic: item.topic,
        attended: item.attended
      });
    });

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -----------------------------
// Add attendance detail
// -----------------------------
exports.addAttendanceDetail = async (req, res) => {
  try {
    const { studentId, subjectId, date, timeSlot, topic, attended } = req.body;

    // Make sure subject exists
    const subject = await Subject.findByPk(subjectId);
    if (!subject) return res.status(404).json({ message: 'Subject not found' });

    const record = await AttendanceDetail.create({
      studentId,
      subjectId,
      date,
      timeSlot,
      topic,
      attended
    });

    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
