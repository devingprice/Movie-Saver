module.exports = function(sequelize, DataTypes) {
  var WishList = sequelize.define("WishList", {
    title: DataTypes.STRING,
    poster_path: DataTypes.STRING
  });
  return WishList;
};
