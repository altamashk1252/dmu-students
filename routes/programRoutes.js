const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');
const { protect } = require('../middleware/authMiddleWare');

// Public routes (no authentication required)
router.get('/', programController.getAllPrograms);
router.get('/lecturers', programController.getAllLecturers);
router.get('/:programId', programController.getProgramById);
router.get('/:programId/years', programController.getProgramYears);
router.get('/years/:yearId/subjects', programController.getYearSubjects);

// Protected routes (authentication required)
router.post('/', protect, programController.createProgram);
router.post('/years', protect, programController.createYear);
router.post('/subjects', protect, programController.createSubject);
router.post('/lecturers', protect, programController.createLecturer);

module.exports = router;
