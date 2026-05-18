import { Router } from 'express';
import multer from 'multer';
import { extname } from 'path';
import LienController from '../controllers/lienController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Configuration multer pour les logos
const storage = multer.diskStorage({
  destination: 'uploads/site/',
  filename: (req, file, cb) => cb(null, `logo-${Date.now()}${extname(file.originalname)}`)
});
const upload = multer({ storage });

// Public route
router.get('/', LienController.getAll);

// Admin routes (protected)
router.get('/admin/all', authMiddleware, LienController.getAllAdmin);
router.post('/admin', authMiddleware, upload.single('logo'), LienController.create);
router.put('/admin/:id', authMiddleware, upload.single('logo'), LienController.update);
router.delete('/admin/:id', authMiddleware, LienController.delete);

export default router;
