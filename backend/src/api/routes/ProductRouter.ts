import { Router, Request, Response } from 'express';
import ProductController from '../controllers/ProductController';
import ProductService from '../services/ProductService';

const productRouter = Router();
const productService = new ProductService();
const productController = new ProductController(productService);

productRouter.get('/', (req: Request, res: Response) => productController.getAll(req, res));
productRouter.put('/', (req: Request, res: Response) => productController.update(req, res));

export default productRouter;
