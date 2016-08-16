module.exports = function Vote(db, Sequelize) {
  return db.define('Vote', {
    value: Sequelize.INTEGER, // -1 (downvote) or 1 (upvote)
    commentable: Sequelize.STRING,
    commentable_id: Sequelize.INTEGER,
  });
};
