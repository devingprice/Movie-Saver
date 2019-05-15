module.exports = function(sequelize, DataTypes) {
  var WishList = sequelize.define("WishList", {
    movieID: DataTypes.INTEGER
  });
  return WishList;
};
