import { Model, STRING, FLOAT, BIGINT } from 'sequelize';
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
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: STRING(100),
      allowNull: false,
    },
    costPrice: {
      type: FLOAT(9, 2),
      allowNull: false,
    },
    salesPrice: {
      type: FLOAT(9, 2),
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
