var Sequelize = require('sequelize');
var db = require('../../db/db');
var Art = require('../art/artModel');

var Place = db.define('Place', {
  longitude: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  latitude: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
});

Place.hasOne(Art);

module.exports = Place;
