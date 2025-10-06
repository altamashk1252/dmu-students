// routes/announcementRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleWare');
const { createAnnouncement, getAnnouncements } = require('../controllers/announcementController');

const router = express.Router();

router.post('/', protect, createAnnouncement);   // Create
router.get('/', getAnnouncements);              // Read

module.exports = router;
