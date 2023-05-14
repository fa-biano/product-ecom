import { ModelStatic } from 'sequelize';
import { IProduct, IProductUpdate, IServiceProduct } from '../interfaces';
import Products from '../../database/models/ProductModel';

export default class ProductService implements IServiceProduct {
  private model: ModelStatic<Products> = Products;

  async getAll(): Promise<IProduct[]> {
    const products = this.model.findAll();
    return products;
  }

  async updateProductPrice(update: IProductUpdate): Promise<void> {
    const { productId, newPrice } = update;
    await this.model.update({ salesPrice: newPrice }, { where: { code: productId } });
  }
}
