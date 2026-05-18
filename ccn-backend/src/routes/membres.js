import { Router } from 'express';
import multer from 'multer';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import MembreController from '../controllers/membreController.js';
import { authMiddleware } from '../middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

const storage = multer.diskStorage({
  destination: join(__dirname, '../../uploads/membres'),
  filename: (req, file, cb) => cb(null, `membre-${Date.now()}${extname(file.originalname)}`)
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Public routes
router.get('/', MembreController.getActive);

// Admin routes
router.get('/admin/all', authMiddleware, MembreController.getAllAdmin);
router.post('/admin', authMiddleware, upload.single('photo'), MembreController.create);
router.put('/admin/:id', authMiddleware, upload.single('photo'), MembreController.update);
router.delete('/admin/:id', authMiddleware, MembreController.delete);

export default router;
