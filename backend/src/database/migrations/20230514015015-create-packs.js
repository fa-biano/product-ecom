'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('packs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      packId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'pack_id',
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'product_id',
      },
      qty: { type: Sequelize.INTEGER, allowNull: false },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('packs');
  }
};
