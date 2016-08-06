const Sequelize = require('sequelize');

const db = new Sequelize('postgres://postgres:emblem@emblem-db:5432/postgres');

const User = require('../resources/user/userModel')(db, Sequelize);
const Art = require('../resources/art/artModel')(db, Sequelize);
const Place = require('../resources/place/placeModel')(db, Sequelize);

Place.hasOne(Art);
User.hasMany(Art);

module.exports = {
  db: db,
  Place: Place,
  Art: Art,
  User: User,
};
