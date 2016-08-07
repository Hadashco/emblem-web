const Art = require('../art/artRoute');

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
  },
  {
    instanceMethods: {
      assignArtById: (artId) => {
        Art.findById(artId).then(art => {
          PlaceModel.addArt(art);
        });
      }
      }
    }
  );
};
