import { Router } from 'express';
import AdminController from '../controllers/adminController.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = Router();

// Toutes les routes admin sont protégées et réservées aux super_admins
router.get('/', authMiddleware, requireRole('super_admin'), AdminController.getAll);
router.post('/', authMiddleware, requireRole('super_admin'), AdminController.create);
router.put('/:id', authMiddleware, requireRole('super_admin'), AdminController.update);
router.patch('/:id/password', authMiddleware, requireRole('super_admin'), AdminController.updatePassword);
router.delete('/:id', authMiddleware, requireRole('super_admin'), AdminController.delete);

export default router;
