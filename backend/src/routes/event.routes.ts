import { Router } from "express";
import { createEvent, contributeToEvent, getEvents } from "../controllers/event.controller";
import { checkJwt } from "../middleware/checkJwt.middleware";
import { hasRole } from "../middleware/hasRole.middleware";
import { Role } from "../types/enums";

const router = Router();

router.get("/", [checkJwt], getEvents);
router.post("/", [checkJwt, hasRole([Role.ADMIN])], createEvent);
router.post("/:id/payments", [checkJwt], contributeToEvent);

export default router;
