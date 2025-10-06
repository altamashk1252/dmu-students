const express = require('express');
const { getAttendanceSummary, getAttendanceDetails, addAttendanceDetail } = require('../controllers/attendanceController');
// const { protect } = require('../middleware/authMiddleWare'); // Uncomment if auth

const router = express.Router();

router.get('/summary/:studentId', getAttendanceSummary);
router.get('/details/:studentId/:subjectName', getAttendanceDetails);
router.post('/add', addAttendanceDetail);

module.exports = router;
