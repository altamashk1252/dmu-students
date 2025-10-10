const express = require('express');
const { register, login,getLecturers } = require('../controllers/AuthController');
const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.get('/lecturers', getLecturers);


module.exports = router;
