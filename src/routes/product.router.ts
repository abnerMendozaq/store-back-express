import { Router } from "express";
import { createProduct, getAllProduct } from "../controllers/product.controller";

let router = Router();

router.post('/create', createProduct);
router.post('/list', getAllProduct);

export default router;