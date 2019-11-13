'use strict'
module.exports = (sequelize, DataTypes) => {
  const item = sequelize.define('item', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.REAL,
      allowNull: false
    }
  }, {})
  item.associate = function (models) {
    // associations can be defined here
    item.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE'
    })
  }
  return item
}
