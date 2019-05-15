module.exports = function(sequelize, DataTypes) {
  var WatchedList = sequelize.define("WatchedList", {
    movieID: DataTypes.INTEGER
  });
  return WatchedList;
};
