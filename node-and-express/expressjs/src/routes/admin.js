import { Router } from 'express';
import { createTimeBlocks, listReservations } from '../controllers/adminCotroller.js';
import { authenticateToken } from '../middlewares/auth.js';
const router = Router();

router.post('/time-blocks', authenticateToken, createTimeBlocks);
router.get('/reservations', authenticateToken, listReservations);

export default router;