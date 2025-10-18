// This file will define the API routes for all wallet-related endpoints.

import { Router } from "express";
import { createTopUpRequest } from "../controllers/wallet.controller";
import { checkJwt } from "../middleware/checkJwt.middleware";

const router = Router();

// Route to initiate a top-up request.
// Secured by JWT authentication.
router.post("/top-up", [checkJwt], createTopUpRequest);

export default router;
