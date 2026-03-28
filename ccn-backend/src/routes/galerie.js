import { Router } from 'express';
import multer from 'multer';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { query } from '../lib/db.js';
import { authMiddleware } from '../middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

const storage = multer.diskStorage({
  destination: join(__dirname, '../../uploads/galerie'),
  filename: (req, file, cb) => cb(null, `photo-${Date.now()}${extname(file.originalname)}`)
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// GET /api/galerie — public
router.get('/', async (req, res) => {
  try {
    const result = await query(`SELECT * FROM galerie_items WHERE publie=true ORDER BY ordre ASC, created_at DESC`);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/admin/galerie/all
router.get('/admin/all', authMiddleware, async (req, res) => {
  try {
    const result = await query(`SELECT * FROM galerie_items ORDER BY ordre ASC`);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/admin/galerie
router.post('/admin', authMiddleware, upload.single('image'), async (req, res) => {
  const { titre, description, date_evenement, categorie, gradient, ordre } = req.body;
  if (!titre) return res.status(400).json({ error: 'titre requis.' });
  const image_path = req.file ? `uploads/galerie/${req.file.filename}` : null;
  try {
    const result = await query(
      `INSERT INTO galerie_items (titre, description, date_evenement, categorie, image_path, gradient, ordre)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [titre, description, date_evenement, categorie, image_path, gradient || 'from-primary to-gold', ordre || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT /api/admin/galerie/:id
router.put('/admin/:id', authMiddleware, upload.single('image'), async (req, res) => {
  const { titre, description, date_evenement, categorie, gradient, ordre, publie } = req.body;
  const image_path = req.file ? `uploads/galerie/${req.file.filename}` : undefined;
  try {
    const setClauses = ['titre=$1','description=$2','date_evenement=$3','categorie=$4','gradient=$5','ordre=$6','publie=$7'];
    const params = [titre, description, date_evenement, categorie, gradient, ordre, publie !== 'false'];
    if (image_path) { setClauses.push(`image_path=$${params.length + 1}`); params.push(image_path); }
    params.push(req.params.id);
    const result = await query(
      `UPDATE galerie_items SET ${setClauses.join(',')} WHERE id=$${params.length} RETURNING *`, params
    );
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE /api/admin/galerie/:id
router.delete('/admin/:id', authMiddleware, async (req, res) => {
  try {
    await query(`DELETE FROM galerie_items WHERE id=$1`, [req.params.id]);
    res.status(204).send();
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
