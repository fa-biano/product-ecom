import { Model, BIGINT } from 'sequelize';
import db from '.';
import Product from './ProductModel';

class Pack extends Model {
  declare id: number;
  declare packId: number;
  declare productId: number;
  declare qty: number;
}

Pack.init(
  {
    id: {
      type: BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    packId: {
      type: BIGINT,
      allowNull: false,
    },
    productId: {
      type: BIGINT,
      allowNull: false,
    },
    qty: {
      type: BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    timestamps: false,
    underscored: true,
    modelName: 'packs',
  },
);

Pack.belongsTo(Product, { foreignKey: 'packId', as: 'packDescription' });
Pack.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

export default Pack;
