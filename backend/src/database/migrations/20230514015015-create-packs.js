'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('packs', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      packId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        field: 'pack_id',
      },
      productId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        field: 'product_id',
      },
      qty: { type: Sequelize.BIGINT, allowNull: false },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('packs');
  }
};
