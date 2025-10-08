import { Router } from "express";
import { validateTransaction } from "../controllers/transaction.controller";
import { checkJwt } from "../middleware/checkJwt.middleware";
import { hasRole } from "../middleware/hasRole.middleware";
import { Role } from "../types/enums";

const router = Router();

router.put("/:id/validate", [checkJwt, hasRole([Role.TREASURER])], validateTransaction);

export default router;
