import { Router } from 'express';
import multer from 'multer';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import ParametreController from '../controllers/parametreController.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

const storage = multer.diskStorage({
  destination: join(__dirname, '../../uploads/president'),
  filename: (req, file, cb) => cb(null, `president${extname(file.originalname)}`)
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Public routes
router.get('/', ParametreController.getAll);

// Admin routes
router.put('/admin', authMiddleware, requireRole('super_admin'), upload.single('president_photo_file'), ParametreController.update);

export default router;
