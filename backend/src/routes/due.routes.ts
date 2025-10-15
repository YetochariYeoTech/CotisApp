import { Router } from 'express';
import { createDue, payDue, getMemberDues, getMemberDueById } from '../controllers/due.controller';
import { checkJwt } from '../middleware/checkJwt.middleware';
import { hasRole } from '../middleware/hasRole.middleware';

const router = Router();

// Route to create a new Due and generate obligations for all members (Admin only)
router.post('/', [checkJwt, hasRole(['ADMIN'])], createDue);

// Route to make a payment for a specific due obligation
router.post('/pay', [checkJwt], payDue);

// Route to get all due obligations for a specific member
router.get('/member/:memberId', [checkJwt], getMemberDues);

// Route to get a single due obligation by its own ID
router.get('/:id', [checkJwt], getMemberDueById);

export default router;