import { Router } from 'express';
import MenuController from '../controllers/menuController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/', MenuController.getActive);

// Admin routes
router.get('/admin/all', authMiddleware, MenuController.getAllAdmin);
router.get('/admin/:id', authMiddleware, MenuController.getById);
router.post('/admin', authMiddleware, MenuController.create);
router.put('/admin/:id', authMiddleware, MenuController.update);
router.delete('/admin/:id', authMiddleware, MenuController.delete);

export default router;
