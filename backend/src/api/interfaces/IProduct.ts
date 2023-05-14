export default interface IProduct {
  code: number;
  name: string;
  costPrice: number;
  salesPrice: number;
}

export interface IProductUpdate {
  productId: number;
  newPrice: number;
}
