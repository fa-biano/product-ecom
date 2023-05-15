import { ModelStatic } from 'sequelize';
import { IPack, IProductUpdate, IServicePack } from '../interfaces';
import Packs from '../../database/models/PacksModel';
import Product from '../../database/models/ProductModel';

export default class PackService implements IServicePack {
  private model: ModelStatic<Packs> = Packs;

  async getAll(): Promise<IPack[]> {
    const packs = await this.model.findAll({
      include: [
        {
          model: Product,
          as: 'product',
        },
        {
          model: Product,
          as: 'packDescription',
        },
      ],
    });
    return packs;
  }

  async updateProductPrice(update: IProductUpdate[]): Promise<void> {
    update.forEach((prod: IProductUpdate) => this.model.update(
      { salesPrice: prod.salesPrice },
      { where: { code: prod.code } },
    ));
  }
}
