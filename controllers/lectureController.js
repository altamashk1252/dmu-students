const { Lecture } = require('../models');

exports.scheduleLecture = async (req, res) => {
  try {
    const lecture = await Lecture.create(req.body);
    res.json(lecture);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getLectures = async (req, res) => {
  const lectures = await Lecture.findAll({ include: ['lecturer'] });
  res.json(lectures);
};
