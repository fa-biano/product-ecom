import { Router, Request, Response } from 'express';
import ProductController from '../controllers/ProductController';

const productRouter = Router();
const productController = new ProductController()

productRouter.get('/', (req: Request, res: Response) => productController.getAll(req, res))

export default productRouter;
