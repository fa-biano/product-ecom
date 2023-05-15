export interface IProductUpdate {
  code: number;
  salesPrice: number;
}
export default interface IProduct extends IProductUpdate {
  name: string;
  costPrice: number;
}

