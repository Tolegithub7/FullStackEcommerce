import { Router } from 'express';
import { createOrder } from './ordersController.js';
import { validateData } from '../..//middlewares/validationMiddleware.js';
import { insertOrderSchema } from '../../db/orders.js';

const router = Router();

router.post('/', validateData(insertOrderSchema), createOrder);

export default router;