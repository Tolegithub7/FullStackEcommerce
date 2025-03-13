import { Request, Response } from 'express';

export async function createOrder(req: Request, res: Response) {
    try {
        console.log(req.cleanBody);
        res.status(201).json({ message: 'Order created' });
    } catch (error) {
        res.status(500).json({ error });
    }
}