module.exports = function Art(db, Sequelize) {
  return db.define('Art', {
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
};
