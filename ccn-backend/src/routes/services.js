import { Router } from 'express';
import ServiceController from '../controllers/serviceController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/', ServiceController.getActive);

// Admin routes
router.post('/admin', authMiddleware, ServiceController.create);
router.put('/admin/:id', authMiddleware, ServiceController.update);
router.delete('/admin/:id', authMiddleware, ServiceController.delete);

export default router;
