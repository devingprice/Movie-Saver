module.exports = function(sequelize, DataTypes) {
  var WatchedList = sequelize.define("WatchedList", {
    apiId: DataTypes.STRING,
    title: DataTypes.STRING,
    // eslint-disable-next-line camelcase
    poster_path: DataTypes.STRING
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
