module.exports = function(sequelize, DataTypes) {
  var WatchedList = sequelize.define("WatchedList", {
    imdbID: DataTypes.STRING
  });

  WatchedList.associate = function(models) {
    WatchedList.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return WatchedList;
};
