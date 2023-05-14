import { Model, INTEGER, STRING, DECIMAL } from 'sequelize';
import db from '.';

class Product extends Model {
  declare code: number;
  declare name: string;
  declare costPrice: number;
  declare salesPrice: number;
}

Product.init(
  {
    code: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: STRING(100),
      allowNull: false,
    },
    costPrice: {
      type: DECIMAL(9, 2),
      allowNull: false,
    },
    salesPrice: {
      type: DECIMAL(9, 2),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    timestamps: false,
    underscored: true,
    modelName: 'products',
  },
);

export default Product;
