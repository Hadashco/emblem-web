module.exports = function Art(db, Sequelize) {
  return db.define('Art', {
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // Tracked in votes model, sum saved for ease of access
    upvotes: {
      type: Sequelize.INTEGER,
    },
    downvotes: {
      type: Sequelize.INTEGER,
    },
  });
};
