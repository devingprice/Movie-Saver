module.exports = function(sequelize, DataTypes) {
  var WishList = sequelize.define("WishList", {
    imdbID: DataTypes.STRING
  });
  return WishList;
};
