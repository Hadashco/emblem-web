module.exports = function Place(db, Sequelize) {
  return PlaceModel =  db.define('Place', {
    long: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    lat: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  });
};
