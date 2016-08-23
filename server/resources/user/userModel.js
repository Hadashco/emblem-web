module.exports = function User(db, Sequelize) {
  return db.define('User', {
    name: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      unique: {
        msg: 'Specified email already in use.',
      },
      validate: {
        isEmail: true,
      },
    },
    fbookId: Sequelize.STRING,
    imgUrl: Sequelize.STRING,
    facebook: Sequelize.JSON,
    markerColor: {
      type: Sequelize.STRING,
      defaultValue: '#FE7569',
    },
  },
    {
      tableName: 'User',
    });
};
