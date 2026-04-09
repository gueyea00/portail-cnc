import { Router } from 'express';
import LienController from '../controllers/lienController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Public route
router.get('/', LienController.getAll);

// Admin routes (protected)
router.post('/admin', authMiddleware, LienController.create);
router.put('/admin/:id', authMiddleware, LienController.update);
router.delete('/admin/:id', authMiddleware, LienController.delete);

export default router;
