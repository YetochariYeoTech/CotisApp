import { Router } from "express";
import { generateDues, payDues } from "../controllers/dues.controller";
import { checkJwt } from "../middleware/checkJwt.middleware";

const router = Router();

router.post("/generate", [checkJwt], generateDues);
router.post("/payments/dues", [checkJwt], payDues);

export default router;
