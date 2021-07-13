import { Router } from "express";
import { login } from "../controllers/auth.controller";

let router = Router();

router.post('/login', login);

export default router;