// routes/newsRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleWare');
const { createNews, getNews } = require('../controllers/newsController');

const router = express.Router();

router.post('/', protect, createNews);   // Create news
router.get('/', getNews);                // Fetch all news

module.exports = router;  // <-- export router, NOT controller
