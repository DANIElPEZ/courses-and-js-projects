import { Router } from 'express';
import authRouter from './auth.js';
import adminRouter from './admin.js';
import reservationsRouter from './reservations.js';
import appointmentsRouter from './appointments.js';
const router = Router();

router.use('/auth', authRouter); // Monta las rutas de "auth.js" bajo /auth
router.use('/admin', adminRouter);
router.use('/reservations', reservationsRouter);
router.use('/users', appointmentsRouter);

export default router;