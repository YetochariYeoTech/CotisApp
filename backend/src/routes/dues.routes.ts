import { Router } from "express";
import { generateDues, getTotalDuesByMember, payDues } from "../controllers/dues.controller";
import { checkJwt } from "../middleware/checkJwt.middleware";

const router = Router();

router.post("/generate", [checkJwt], generateDues);
router.post("/payments/dues", [checkJwt], payDues);
router.get("/dues/total-by-member", [checkJwt], getTotalDuesByMember);

export default router;
