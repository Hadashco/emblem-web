const Sequelize = require('sequelize');

const db = new Sequelize('postgres://postgres:emblem@emblem-db:5432/postgres');

const User = require('../resources/user/userModel')(db, Sequelize);
const Art = require('../resources/art/artModel')(db, Sequelize);
const Place = require('../resources/place/placeModel')(db, Sequelize);

const ArtPlace = db.define('art_place', {
  active: Sequelize.BOOLEAN
});

Place.belongsToMany(Art, { through: ArtPlace });
Art.belongsToMany(Place, { through: ArtPlace });

User.hasMany(Art);

module.exports = {
  db: db,
  Place: Place,
  Art: Art,
  User: User,
};
