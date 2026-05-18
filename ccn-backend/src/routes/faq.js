import { Router } from 'express';
import FAQController from '../controllers/faqController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/', FAQController.getAll);

// Admin routes
router.get('/admin/all', authMiddleware, FAQController.getAllAdmin);
router.post('/admin', authMiddleware, FAQController.create);
router.put('/admin/:id', authMiddleware, FAQController.update);
router.delete('/admin/:id', authMiddleware, FAQController.delete);

export default router;
