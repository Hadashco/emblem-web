module.exports = function Vote(db, Sequelize) {
  return db.define('Vote', {
    value: Sequelize.INTEGER, // -1 (downvote) or 1 (upvote)
    voteable: Sequelize.STRING,
    voteable_id: Sequelize.INTEGER,
  },
    {
      tableName: 'Vote',
    });
};
