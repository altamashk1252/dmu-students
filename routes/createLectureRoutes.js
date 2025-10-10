const express = require("express");
const { protect } = require('../middleware/authMiddleWare');

const router = express.Router();
const lectureController = require("../controllers/createLectureController");

router.post("/schedule",protect, lectureController.scheduleLecture);
router.post("/", protect,lectureController.getLectures);

module.exports = router;
