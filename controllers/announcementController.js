// controllers/announcementController.js
const Announcement = require('../models/Announcement'); // <-- Import model here


exports.createAnnouncement = async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'lecturer') {
      return res.status(403).json({ message: "Only admin or lecturer can create announcements" });
    }

    const { title, type, subject, image_url, date } = req.body;

    const announcement = await Announcement.create({
      title,
      type,
      subject,
      image_url,
      date,
      createdBy: req.user.name,
      creatorRole: req.user.role
    });

    res.status(201).json(announcement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAnnouncements = async (req, res) => {
  const list = await Announcement.findAll({ order: [['createdAt', 'DESC']] });
  res.json(list);
};
