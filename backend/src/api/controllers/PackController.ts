import { Request, Response } from 'express';
import { IServicePack } from '../interfaces';

export default class PackController {
  private service: IServicePack;

  constructor(service: IServicePack) {
    this.service = service;
  }

  async getAll(_req: Request, res: Response) {
    const packs = await this.service.getAll();
    return res.status(200).json(packs);
  }
}
