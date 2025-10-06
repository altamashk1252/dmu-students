const express = require('express');
const { getEvents, createEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleWare'); // optional auth

const router = express.Router();

// GET all events
router.get('/', protect, getEvents);

// POST new event
router.post('/', protect, createEvent);

module.exports = router;
