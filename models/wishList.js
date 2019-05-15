module.exports = function(sequelize, DataTypes) {
  var WishList = sequelize.define("WishList", {
    apiId: DataTypes.STRING,
    title: DataTypes.STRING,
    // eslint-disable-next-line camelcase
    poster_path: DataTypes.STRING
  });

  WishList.associate = function(models) {
    WishList.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return WishList;
};
