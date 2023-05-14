import { Router, Request, Response } from 'express';
import PackController from '../controllers/PackController';
import PackService from '../services/PackService';

const packRouter = Router();
const packService = new PackService();
const packController = new PackController(packService);

packRouter.get('/', (req: Request, res: Response) => packController.getAll(req, res));

export default packRouter;