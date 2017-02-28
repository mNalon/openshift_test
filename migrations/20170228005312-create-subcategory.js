'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable('Subcategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    return queryInterface.sequelize.query("ALTER TABLE Subcategories ADD CONSTRAINT category_subcategory_fkey FOREIGN KEY" +
                                  "(category_id) REFERENCES Categories (id)" +
                                  "ON DELETE CASCADE;");
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Subcategories');
  }
};