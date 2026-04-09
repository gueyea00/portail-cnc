import { Router } from 'express';
import multer from 'multer';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import GalerieController from '../controllers/galerieController.js';
import { authMiddleware } from '../middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

const storage = multer.diskStorage({
  destination: join(__dirname, '../../uploads/galerie'),
  filename: (req, file, cb) => cb(null, `photo-${Date.now()}${extname(file.originalname)}`)
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Public routes
router.get('/', GalerieController.getPublished);

// Admin routes
router.get('/admin/all', authMiddleware, GalerieController.getAllAdmin);
router.post('/admin', authMiddleware, upload.single('image'), GalerieController.create);
router.put('/admin/:id', authMiddleware, upload.single('image'), GalerieController.update);
router.delete('/admin/:id', authMiddleware, GalerieController.delete);

export default router;
