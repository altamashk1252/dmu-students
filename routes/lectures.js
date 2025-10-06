const express = require('express');
const { scheduleLecture, getLectures } = require('../controllers/lectureController');
const { protect } = require('../middleware/authMiddleWare');
const router = require('express').Router();

router.post('/', protect, scheduleLecture);
router.get('/', protect, getLectures);

module.exports = router;
