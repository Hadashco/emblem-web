module.exports = function Comment(db, Sequelize) {
  return db.define('Comment', {
    commentOn: {
      type: Sequelize.STRING, // Art, ArtPlace, etc.
      allowNull: false,
    },
    commentId: {
      type: Sequelize.INTEGER, // ID of item commented on
    },
    comment: {
      type: Sequelize.STRING, // content of comment
    },
  });
};
