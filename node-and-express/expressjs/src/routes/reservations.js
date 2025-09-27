import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.js";
import { createReservationController, deleteReservationController, getReservationController, updateReservationController } from '../controllers/reservationController.js';
const router = Router();

router.post('/', authenticateToken, createReservationController);
router.get('/:id', authenticateToken, getReservationController);
router.put('/:id', authenticateToken, updateReservationController);
router.delete('/:id', authenticateToken, deleteReservationController);

export default router;