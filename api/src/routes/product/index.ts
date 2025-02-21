import { Router } from "express";
import { 
    listProducts, 
    getProductsById, 
    createProduct,
    updateProduct,
    deleteProduct,
} from "./productsController";

const router = Router();
//Product routes
router.get("/", listProducts);
router.get("/:id", getProductsById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;