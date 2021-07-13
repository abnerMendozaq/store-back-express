import { Request, Response, Router } from "express";
import { decodeData } from "../lib/jwt-auth";
import { resolve } from "path";

import userRouter from "./user.router";
import transactionRouter from "./transaction.router";
import storeRouter from "./store.router";
import categoryRouter from "./category.router";
import authRouter from "./auth.router";
import uploadRouter from "./upload.router";
import imageRouter from "./image.router";
import roleRouter from "./role.router";
import productRouter from "./product.router";

let router = Router();

router.use('/transactions', transactionRouter);
router.use('/categories', [decodeData], categoryRouter);
router.use('/stores', [decodeData], storeRouter);
router.use('/users', [decodeData], userRouter);
router.use('/products', [decodeData], productRouter);
router.use('/upload', [decodeData], uploadRouter);
router.use('/roles', [decodeData], roleRouter);
router.use('/auth', authRouter);
router.use('/img', imageRouter);
/* GET home page. */
router.get('/', function (req: Request, res: Response) {
  return res.sendFile(resolve(__dirname, '../public/index.html'));
});


export default router;
