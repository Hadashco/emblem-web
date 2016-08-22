module.exports = function ArtPlace(db, Sequelize) {
  return db.define('ArtPlace', {
    _id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    active: Sequelize.BOOLEAN,
    upvotes: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    downvotes: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    // TODO: add photo of marker location
  },
    {
      tableName: 'ArtPlace',
    });
};
