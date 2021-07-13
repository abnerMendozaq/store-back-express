import { Router } from "express";
import { createUser, getAllUser } from "../controllers/user.controller";

let router = Router();

router.get('/list', getAllUser);
router.post('/create', createUser);

export default router;