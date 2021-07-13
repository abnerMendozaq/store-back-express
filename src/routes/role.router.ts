import { Router } from "express";
import { createRole, getAllRole, getRole, updateRole } from "../controllers/role.controller";

let router = Router();

router.get('/list', getAllRole);
router.get('/onerole/:idRole', getRole);
router.post('/create', createRole);
router.put('/update', updateRole);

export default router;