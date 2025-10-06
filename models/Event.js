const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Event = sequelize.define('Event', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  image_url: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  createdBy: {          // NEW
    type: DataTypes.STRING,
    allowNull: false,
  },
  creatorRole: {         // NEW
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'events',
});

module.exports = Event;
