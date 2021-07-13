import { Router } from "express";
import { createCategory, getAllCategory } from "../controllers/category.controller";

let router = Router();

router.get('/list', getAllCategory);
router.post('/create', createCategory);

export default router;