import { Router } from "express";
import fileupload from "express-fileupload";
import { uploadImgProduct, uploadImgUser } from "../controllers/upload.controller";

let router = Router();
router.use(fileupload());

router.post('/store/:category', uploadImgProduct);
router.post('/user', uploadImgUser);

export default router;