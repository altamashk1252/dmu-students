const { User } = require('../models');

const getStudents = async (req, res) => {
  try {
    const { program, year } = req.query;
    const where = { role: 'student' };
    if (program) where.program = program;
    if (year) where.year = parseInt(year);

    const students = await User.findAll({ where });
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getStudents };
