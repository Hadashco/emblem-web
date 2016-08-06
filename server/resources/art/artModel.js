module.exports = function Art(sequelize, DataTypes) {
  return sequelize.define('Art', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
