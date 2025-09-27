import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.js";
import { getUserAppoinment } from "../controllers/appointmentController.js";
const router=Router();

router.get('/:id/appoinments', authenticateToken, getUserAppoinment);

export default router;