const express = require('express');
const { getStudents } = require('../controllers/studentsController'); // destructure
const { protect } = require('../middleware/authMiddleWare'); // ensure protect is exported correctly

const router = require('express').Router();

router.post('/', protect, getStudents);

module.exports = router;
