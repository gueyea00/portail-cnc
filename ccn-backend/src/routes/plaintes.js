import { Router } from 'express';
import PlainteController from '../controllers/plainteController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Public routes
router.post('/', PlainteController.create);

// Admin routes
router.get('/admin/all', authMiddleware, PlainteController.getAllAdmin);
router.get('/admin/stats', authMiddleware, PlainteController.getStats);
router.get('/admin/:id', authMiddleware, PlainteController.getById);
router.patch('/admin/:id/statut', authMiddleware, PlainteController.updateStatut);
router.put('/admin/:id/note', authMiddleware, PlainteController.updateNote);

export default router;
