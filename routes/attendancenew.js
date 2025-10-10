// routes/announcementRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleWare');
const { createAnnouncement, getAnnouncements } = require('../controllers/announcementController');



const router = express.Router();
const attendanceController = require("../controllers/attendanceControllernew");

router.post("/mark", protect, attendanceController.markAttendance);
router.get("/:studentId", protect, attendanceController.getStudentAttendance);
router.get("/lecture/:lectureId", protect, attendanceController.getLectureAttendance);
router.get('/student/:studentId',protect, attendanceController.getStudentAttendance);
router.get('/summarys/:studentId', attendanceController.getStudentAttendanceSummary); // <-- Error line
module.exports = router;
