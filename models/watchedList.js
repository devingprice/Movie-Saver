module.exports = function(sequelize, DataTypes) {
  var WatchedList = sequelize.define("WatchedList", {
    title: DataTypes.STRING,
    poster_path: DataTypes.STRING
  });
  return WatchedList;
};
