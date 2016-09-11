module.exports = function Place(db, Sequelize) {
  return db.define('Place', {
    long: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    lat: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    sector: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
    {
      tableName: 'Place',
    });
};
