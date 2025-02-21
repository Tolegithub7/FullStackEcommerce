import { Request, Response } from "express";
import { db } from "../../db/index";
import { productsTable } from "../../db/productsSchema";
import { eq } from "drizzle-orm";

// Product Controller
export async function listProducts(req: Request, res: Response) {
    try {
        const products = await db.select().from(productsTable);
        res.status(201).json(products);
    } catch (e) {
        res.status(500).send(e);
    }
}

export async function getProductsById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const product = await db
            .select()
            .from(productsTable)
            .where(eq(productsTable.id, Number(id)));
        if (!product) {
            res.status(404).send({ message: "Product not found" });
        } else {
            res.status(201).json(product);
        }
    } catch (e) {
        res.status(500).send(e);
    }
}

export async function createProduct(req: Request, res: Response) {
    try {
        // await db.insert(productsTable).values(req.body);\
        const [products] = await db.insert(productsTable).values(req.body).returning();
        // res.send("createProduct");
        res.status(201).json(products);
    } catch (e) {
        res.status(500).send(e);
    }

}

export async function updateProduct(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const updatedField = req.body;
        const [product] = await db
            .update(productsTable)
            .set(updatedField)
            .where(eq(productsTable.id, id))
            .returning();
        if (product) {
            res.json(product);
        } else {
            res.status(404).send({ message: "Product not found" });
        }
    } catch (e) {
        res.status(500).send(e);
    }
}

export async function deleteProduct(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const [deletedProduct] = await db
            .delete(productsTable)
            .where(eq(productsTable.id, id))
            .returning();
        if (deletedProduct) {
            res.status(204).send();
            
        } else {
            res.status(404).send({ message: "Product to delete not found" });
        }
    } catch (e) {
        res.status(500).send(e);
    }
}