const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { 
      name, email, password, role, subject, program, year,
      admissionYear, category, dob, mobile, guardianMobile 
    } = req.body;

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ 
      name, email, password_hash, role, subject, program, year,
      admissionYear, category, dob, mobile, guardianMobile 
    });

    // Generate token (optional auto-login)
    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Hide password_hash before sending response
    const userResponse = user.toJSON();
    delete userResponse.password_hash;

    res.json({ token, user: userResponse });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getLecturers = async (req, res) => {
  try {
    const lecturers = await User.findAll({
      where: { role: 'lecturer' },
      attributes: ['id', 'name', 'email', 'subject', 'program', 'year'] // pick only needed fields
    });

    res.json(lecturers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch lecturers' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Hide password_hash before sending response
    const userResponse = user.toJSON();
    delete userResponse.password_hash;

    res.json({ token, user: userResponse });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
