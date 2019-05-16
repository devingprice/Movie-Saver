module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = function(models) {
    User.hasMany(models.WatchedList, {
      onDelete: "cascade"
    });
    User.hasMany(models.WishList, {
      onDelete: "cascade"
    });
  };

  return User;
};
