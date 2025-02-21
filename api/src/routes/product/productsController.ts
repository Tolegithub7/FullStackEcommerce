import { Request, Response } from "express";

// Product Controller
export function listProducts(req: Request, res: Response) {
    res.send("listProducts");
}

export function getProductsById(req: Request, res: Response) {
    res.send("getProductsById");
}

export function createProduct(req: Request, res: Response) {
    console.log(req.body);
    res.send("createProduct");
}

export function updateProduct(req: Request, res: Response) {
    res.send("updateProducts");
}

export function deleteProduct(req: Request, res: Response) {
    res.send("deleteProduct");
}