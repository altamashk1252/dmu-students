const { Event } = require('../models');

const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll({ order: [['date', 'ASC']] });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, description, image_url, date,location } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: 'Title and Date are required' });
    }

    // req.user should have name and role from the token
    const createdBy = req.user.name || 'Unknown';
    const creatorRole = req.user.role || 'Unknown';

    const event = await Event.create({ 
      title, 
      description, 
      image_url, 
      date,
      location,
      createdBy,
      creatorRole
    });

    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getEvents, createEvent };
