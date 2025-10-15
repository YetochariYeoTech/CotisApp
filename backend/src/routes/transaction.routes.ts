import { Router } from "express";
import { getAllTransactions, getTransactionsByMember, validateTransaction } from "../controllers/transaction.controller";
import { checkJwt } from "../middleware/checkJwt.middleware";
import { hasRole } from "../middleware/hasRole.middleware";
import { Role } from "../types/enums";

const router = Router();

// Get all transactions (Admin/Treasurer only)
router.get('/', [checkJwt, hasRole([Role.ADMIN, Role.TREASURER])], getAllTransactions);

// Get all transactions for a specific member
router.get('/member/:memberId', [checkJwt], getTransactionsByMember);

// Validate a transaction (Treasurer only)
router.put("/:id/validate", [checkJwt, hasRole([Role.TREASURER])], validateTransaction);

export default router;