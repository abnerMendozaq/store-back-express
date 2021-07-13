import { Router } from "express";
import { createBranchUser, createPersonUser, createPersonUserBranch  } from "../controllers/transaction.controller";

let router = Router();

router.post('/createuser', createPersonUser);
router.post('/createuserbranch', createPersonUserBranch);
router.post('/createbranchuser', createBranchUser);

export default router;