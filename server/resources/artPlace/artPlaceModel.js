module.exports = function ArtPlace(db, Sequelize) {
  return db.define('ArtPlace', {
    active: Sequelize.BOOLEAN,
    upvotes: Sequelize.INTEGER,   // Track total sum
    downvotes: Sequelize.INTEGER, // stored in votes model
    // TODO: add photo of marker location
  });
};
