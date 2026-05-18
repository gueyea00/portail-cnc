import { Router } from 'express';
import multer from 'multer';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import DocumentController from '../controllers/documentController.js';
import { authMiddleware } from '../middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

const storage = multer.diskStorage({
  destination: join(__dirname, '../../uploads/documents'),
  filename: (req, file, cb) => cb(null, `doc-${Date.now()}${extname(file.originalname)}`)
});
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

// Public routes
router.get('/', DocumentController.getAll);

// Admin routes
router.get('/admin/all', authMiddleware, DocumentController.getAllAdmin);
router.post('/admin', authMiddleware, upload.single('fichier'), DocumentController.create);
router.put('/admin/:id', authMiddleware, upload.single('fichier'), DocumentController.update);
router.delete('/admin/:id', authMiddleware, DocumentController.delete);

export default router;
