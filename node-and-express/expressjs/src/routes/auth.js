import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/protected', authenticateToken, (req, res) => {
     res.send('ruta protegida');
});

export default router;