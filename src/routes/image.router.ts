import { Router } from "express";
import { getImage, getImageUser } from "../controllers/upload.controller";

let router = Router();

router.get('/store/:category/:img', getImage);
router.get('/user/:img', getImageUser);

export default router;