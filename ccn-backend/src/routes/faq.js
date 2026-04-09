import { Router } from 'express';
import FAQController from '../controllers/faqController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', FAQController.getAll);
router.get('/:id', FAQController.getById);

router.post('/', authMiddleware, FAQController.create);
router.put('/:id', authMiddleware, FAQController.update);
router.delete('/:id', authMiddleware, FAQController.delete);

export default router;
