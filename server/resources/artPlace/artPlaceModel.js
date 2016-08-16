module.exports = function ArtPlace(db, Sequelize) {
  return db.define('ArtPlace', {
    active: Sequelize.BOOLEAN,
    upvotes: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    downvotes: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    // TODO: add photo of marker location
  });
};
