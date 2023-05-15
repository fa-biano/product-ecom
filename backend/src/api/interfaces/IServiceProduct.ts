import IProduct, { IProductUpdate } from './IProduct';

export default interface IServiceProduct {
  getAll(): Promise<IProduct[]>;
  updateProductPrice(update: IProductUpdate[]): Promise<void>;
}
