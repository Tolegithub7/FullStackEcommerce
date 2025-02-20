import { Router } from "express";

const router = Router();
//Product routes
router.get("/", (req, res) => {
    res.send("Product page");
})
router.get("/:id", (req, res) => {
    console.log(req.params)
    res.send("a Product");
})
router.post("/", (req, res) => {
    res.send("Product created");
})

export default router;