module.exports = function(sequelize, DataTypes) {
  var WishList = sequelize.define("WishList", {
    imdbID: DataTypes.STRING,
    title: DataTypes.STRING,
    poster_path: DataTypes.STRING
  });
  return WishList;
};
