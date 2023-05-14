import IPack from './IPack';
// import { IProductUpdate } from './IProduct';

export default interface IServicePack {
  getAll(): Promise<IPack[]>;
  // updateProductPrice(update: IProductUpdate): Promise<void>;
}
