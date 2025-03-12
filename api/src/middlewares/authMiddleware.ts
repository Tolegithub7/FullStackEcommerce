import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: 'Access denied on verifying' });
        return;
    }
    try {
        // decode jwt token
        const decoded = jwt.verify(token, 'my-secret-in-secret');
        // console.log(decoded);
        if (typeof decoded !== 'object' || !decoded?.userId) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    } catch (error) {
        res.status(401).send({ message: 'Invalid token' });
        return;
    }
    // return next();
}

export function verifySeller(req: Request, res: Response, next: NextFunction) {
    const role = req.role;
    if (role !== 'Seller') {
        res.status(401).json({ message: 'Access denied' });
        return;
    }
    next();
    // return next();
}