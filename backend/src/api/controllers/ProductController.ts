import { Request, Response } from 'express';

export default class ProductController {

  async getAll(_req: Request, res: Response) {
    return res.status(200).json({ message: 'Deu certo!'})
  }
}
