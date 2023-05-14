import { Request, Response } from 'express';
import { IServiceProduct } from '../interfaces';

export default class ProductController {
  private service: IServiceProduct;

  constructor(service: IServiceProduct) {
    this.service = service;
  }

  async getAll(_req: Request, res: Response) {
    const products = await this.service.getAll();
    return res.status(200).json(products);
  }
}
