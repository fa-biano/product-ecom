'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      code: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      costPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
        field: 'cost_price',
      },
      salesPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
        field: 'sales_price',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
