import { Router } from 'express';
import multer from 'multer';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import ParametreController from '../controllers/parametreController.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

const storage = multer.diskStorage({
  destination: join(__dirname, '../../uploads/site'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Public routes
router.get('/', ParametreController.getAll);

// Admin routes
router.put('/admin', authMiddleware, requireRole('super_admin'), upload.fields([
  { name: 'president_photo_file', maxCount: 1 },
  { name: 'hero_bg_file', maxCount: 1 },
  { name: 'logo_file', maxCount: 1 },
  { name: 'armoiries_file', maxCount: 1 }
]), ParametreController.update);

export default router;
