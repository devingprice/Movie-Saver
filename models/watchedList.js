module.exports = function(sequelize, DataTypes) {
  var WatchedList = sequelize.define("WatchedList", {
    id: DataTypes.STRING,
    title: DataTypes.STRING,
    poster_path: DataTypes.STRING
  });
  return WatchedList;
};
