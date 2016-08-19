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
    // Trim lat and long to five decimal places (e.g. 37.45635)
    // Concat two numbers together as strings
    sector: {
      type: Sequelize.STRING,
      allowNull: false,
    }, 
  },
  {
    tableName: 'Place'
  });
};
