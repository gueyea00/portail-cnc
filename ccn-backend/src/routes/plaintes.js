import { Router } from 'express';
import multer from 'multer';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import PlainteController from '../controllers/plainteController.js';
import { authMiddleware } from '../middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

const storage = multer.diskStorage({
  destination: join(__dirname, '../../uploads/plaintes'),
  filename: (req, file, cb) => cb(null, `plainte-${Date.now()}-${Math.round(Math.random() * 1E9)}${extname(file.originalname)}`)
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Public routes
router.post('/', upload.array('fichiers', 5), PlainteController.create);

// Admin routes
router.get('/admin/all', authMiddleware, PlainteController.getAllAdmin);
router.get('/admin/stats', authMiddleware, PlainteController.getStats);
router.get('/admin/:id', authMiddleware, PlainteController.getById);
router.patch('/admin/:id/statut', authMiddleware, PlainteController.updateStatut);
router.put('/admin/:id/note', authMiddleware, PlainteController.updateNote);

export default router;
