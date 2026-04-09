import { Router } from 'express';
import multer from 'multer';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import DecisionController from '../controllers/decisionController.js';
import { authMiddleware } from '../middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

const storage = multer.diskStorage({
  destination: join(__dirname, '../../uploads/decisions'),
  filename: (req, file, cb) => cb(null, `decision-${Date.now()}${extname(file.originalname)}`)
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Public routes
router.get('/', DecisionController.getPublished);

// Admin routes
router.get('/admin/all', authMiddleware, DecisionController.getAllAdmin);
router.post('/admin', authMiddleware, upload.single('pdf'), DecisionController.create);
router.put('/admin/:id', authMiddleware, upload.single('pdf'), DecisionController.update);
router.delete('/admin/:id', authMiddleware, DecisionController.delete);

export default router;
