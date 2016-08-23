module.exports = function Comment(db, Sequelize) {
  return db.define('Comment', {
    title: Sequelize.STRING,
    commentable: Sequelize.STRING,
    commentable_id: Sequelize.INTEGER,
  },
    {
      tableName: 'Comment',
    });
};
