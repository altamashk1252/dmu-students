const { News } = require('../models'); // Sequelize model

exports.createNews = async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'lecturer') {
      return res.status(403).json({ message: 'Only admin or lecturer can create news' });
    }

    const { title, summary, subject, image_url, date } = req.body;

    const news = await News.create({
      title,
      summary,
      subject,
      image_url,
      date,
      createdBy: req.user.name,
      creatorRole: req.user.role
    });

    res.status(201).json(news);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getNews = async (req, res) => {
  try {
    const list = await News.findAll({ order: [['createdAt', 'DESC']] });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
