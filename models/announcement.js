const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // your sequelize instance

const Announcement = sequelize.define('Announcement', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
  },
  subject: {
    type: DataTypes.STRING,
  },
  image_url: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATEONLY,
  },
  createdBy: {
    type: DataTypes.STRING,
  },
  creatorRole: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'announcements',
});

module.exports = Announcement;
