module.exports = function(sequelize, DataTypes) {
  var WatchedList = sequelize.define("WatchedList", {
    imdbID: DataTypes.STRING
  });
  return WatchedList;
};
