module.exports = function Vote(db, Sequelize) {
  return db.define('Vote', {
    voteOn: {
      type: Sequelize.STRING, // Art, ArtPlace, etc.
      allowNull: false,
    },
    voteId: {
      type: Sequelize.INTEGER, // ID of item voted on
    },
    vote: {
      type: Sequelize.INTEGER, // -1 (downvote) or 1 (upvote)
    },
  });
};
