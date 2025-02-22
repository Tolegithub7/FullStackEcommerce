import { Router } from "express";
import { 
    listProducts, 
    getProductsById, 
    createProduct,
    updateProduct,
    deleteProduct,
} from "./productsController";
import { validateData } from "../..//middlewares/validationMiddleware";
import { z } from "zod";
import { createProductSchema } from "../../db/productsSchema";
// import { createInsertSchema, createSelectSchema } from "drizzle-zod";
// import { productsTable } from "../../db/productsSchema";

// const createProductSchema = z.object({
//     name: z.string(),
//     price: z.number(),
// })

// export const createProductSchema = createSelectSchema(productsTable, { id: z.number() }).omit({
//     id: true,
// });
// // type ProductType = z.infer<typeof createProductSchema>;
// // const updateProductSchema = createSelectSchema(productsTable, { id: z.number() });

const router = Router();
//Product routes
router.get("/", listProducts);
router.get("/:id", getProductsById);
router.post("/" ,validateData(createProductSchema) , createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;







