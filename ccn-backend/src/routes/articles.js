import { Router } from 'express';
import multer from 'multer';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import ArticleController from '../controllers/articleController.js';
import { authMiddleware } from '../middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

const storage = multer.diskStorage({
  destination: join(__dirname, '../../uploads/articles'),
  filename: (req, file, cb) => cb(null, `article-${Date.now()}${extname(file.originalname)}`)
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Public routes
router.get('/', ArticleController.getPublished);
router.get('/:slug', ArticleController.getBySlug);

// Admin routes
router.get('/admin/all', authMiddleware, ArticleController.getAllAdmin);
router.post('/admin', authMiddleware, upload.single('image'), ArticleController.create);
router.put('/admin/:id', authMiddleware, upload.single('image'), ArticleController.update);
router.delete('/admin/:id', authMiddleware, ArticleController.delete);

export default router;
