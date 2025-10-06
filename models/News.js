const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const News = sequelize.define('News', {
  title: { type: DataTypes.STRING, allowNull: false },
  summary: { type: DataTypes.TEXT, allowNull: false },
  image_url: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE, allowNull: false },

  createdBy: { type: DataTypes.STRING, allowNull: false },
  creatorRole: { type: DataTypes.STRING, allowNull: false },
});

module.exports = News;
