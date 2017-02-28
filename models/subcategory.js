'use strict';

module.exports = function(sequelize, DataTypes) {
  var Subcategory = sequelize.define('Subcategory', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Subcategory.belongsTo(models.Category, {foreignKey:'category_id'});
      }
    }
  });
  return Subcategory;
};