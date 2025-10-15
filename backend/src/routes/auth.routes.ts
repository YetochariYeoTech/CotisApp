import { Router } from "express";
import { login, register, activateAccount } from "../controllers/auth.controller";
import { checkJwt } from "../middleware/checkJwt.middleware";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/activate-account", [checkJwt], activateAccount);

export default router;