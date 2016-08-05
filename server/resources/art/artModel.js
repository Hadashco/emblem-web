var Sequelize = require('sequelize');
var db = require('../../db/db.js');

var Art = db.define('Art', {
  type: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Art;
