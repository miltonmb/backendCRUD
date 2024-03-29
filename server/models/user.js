'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {})
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Category,{
      foreignKey: 'userId',
      as: 'categories',
    })
  }
  return User
}
