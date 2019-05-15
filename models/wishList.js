module.exports = function(sequelize, DataTypes) {
  var WishList = sequelize.define("WishList", {
    apiId: DataTypes.STRING
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
