import { Router } from "express";
import { getFinancialSummary } from "../controllers/report.controller";
import { checkJwt } from "../middleware/checkJwt.middleware";
import { hasRole } from "../middleware/hasRole.middleware";
import { Role } from "../types/enums";

const router = Router();

router.get("/financial-summary", [checkJwt, hasRole([Role.AUDITOR])], getFinancialSummary);

export default router;
