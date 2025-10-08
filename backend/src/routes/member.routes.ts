import { Router } from "express";
import { getMembers, getMemberById, getMembersUpToDate, getMemberDuesReport } from "../controllers/member.controller";
import { checkJwt } from "../middleware/checkJwt.middleware";

const router = Router();

router.get("/", [checkJwt], getMembers);
router.get("/up-to-date", [checkJwt], getMembersUpToDate);
router.get("/:id", [checkJwt], getMemberById);
router.get("/:id/dues-report", [checkJwt], getMemberDuesReport);

export default router;