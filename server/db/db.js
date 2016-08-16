const Sequelize = require('sequelize');

const db = new Sequelize('postgres://postgres:emblem@emblem-db:5432/postgres');

const User = require('../resources/user/userModel')(db, Sequelize);
const Art = require('../resources/art/artModel')(db, Sequelize);
const Place = require('../resources/place/placeModel')(db, Sequelize);
const Comment = require('../resources/comment/commentModel')(db, Sequelize);
const Vote = require('../resources/vote/voteModel')(db, Sequelize);

const ArtPlace = db.define('art_place', {
  active: Sequelize.BOOLEAN,
  // TODO: add photo of marker location
});

Place.belongsToMany(Art, { through: ArtPlace });
Art.belongsToMany(Place, { through: ArtPlace });

Art.belongsTo(User);
Place.belongsTo(User); // Originally posted by

Comment.belongsTo(User);
Vote.belongsTo(User);

module.exports = {
  db,
  Place,
  Art,
  User,
  Comment,
  Vote,
};
