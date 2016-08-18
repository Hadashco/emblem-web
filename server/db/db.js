const Sequelize = require('sequelize');

const db = new Sequelize('postgres://postgres:emblem@emblem-db:5432/postgres');

const User = require('../resources/user/userModel')(db, Sequelize);
const Art = require('../resources/art/artModel')(db, Sequelize);
const Place = require('../resources/place/placeModel')(db, Sequelize);
const Comment = require('../resources/comment/commentModel')(db, Sequelize);
const Vote = require('../resources/vote/voteModel')(db, Sequelize);
const ArtPlace = require('../resources/artPlace/artPlaceModel')(db, Sequelize);

const TRAILING_DEC_SECTOR = 5; // Number of trailing decimals in sector

Place.belongsToMany(Art, { through: ArtPlace });
Art.belongsToMany(Place, { through: ArtPlace });

Art.belongsTo(User);
Place.belongsTo(User); // Originally posted by

Comment.belongsTo(User);
Vote.belongsTo(User);

/* ***************************************************************

                      COMMENTS

*****************************************************************/

// Asign comments to ArtPlace
ArtPlace.hasMany(Comment, {
  foreignKey: 'commentable_id',
  constraints: false,
  scope: {
    commentable: 'ArtPlace',
  },
});
Comment.belongsTo(ArtPlace, {
  foreignKey: 'commentable_id',
  constraints: false,
  as: 'comment',
});

// Asign comments to Art
Art.hasMany(Comment, {
  foreignKey: 'commentable_id',
  constraints: false,
  scope: {
    commentable: 'Art',
  },
});
Comment.belongsTo(Art, {
  foreignKey: 'commentable_id',
  constraints: false,
  as: 'comment',
});


/* ***************************************************************

                      VOTES

*****************************************************************/

// Asign votes to ArtPlace
ArtPlace.hasMany(Vote, {
  foreignKey: 'voteable_id',
  constraints: false,
  scope: {
    voteable: 'ArtPlace',
  },
});
Vote.belongsTo(ArtPlace, {
  foreignKey: 'voteable_id',
  constraints: false,
  as: 'vote',
});

// Asign votes to Art
Art.hasMany(Vote, {
  foreignKey: 'voteable_id',
  constraints: false,
  scope: {
    voteable: 'Art',
  },
});
Vote.belongsTo(Art, {
  foreignKey: 'voteable_id',
  constraints: false,
  as: 'vote',
});

/* ***************************************************************

                      DATABASE EXPORTS

*****************************************************************/

module.exports = {
  db,
  Place,
  Art,
  User,
  Comment,
  Vote,
  ArtPlace,
  TRAILING_DEC_SECTOR,
};
