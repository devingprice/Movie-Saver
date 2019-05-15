module.exports = function(sequelize, DataTypes) {
  var WishList = sequelize.define("WishList", {
    id: DataTypes.STRING,
    title: DataTypes.STRING,
    poster_path: DataTypes.STRING
  });
  return WishList;
};
