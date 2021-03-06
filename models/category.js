'use strict';
module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Category.hasMany(models.Subcategory, {as:'Category', foreignKey:'category_id', onDelete:'cascade'});
      }
    }
  });
  return Category;
};