// This file will define the API routes for all incoming webhooks.

import { Router } from "express";
import { handleWaveWebhook } from "../controllers/webhooks.controller";

const router = Router();

// Route to handle incoming webhook notifications from Wave.
// This route is not protected by JWT, but by signature verification.
router.post("/wave", handleWaveWebhook);

export default router;
