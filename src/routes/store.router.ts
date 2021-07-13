import { Router } from "express";
import { createStore, getAllStore, getStoresByUser } from "../controllers/store.controller";

let router = Router();

router.get('/list', getAllStore);
router.get('/list/:idUser', getStoresByUser);
router.post('/create', createStore);

export default router;