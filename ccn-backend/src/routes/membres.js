import { Router } from 'express';
import multer from 'multer';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { query } from '../lib/db.js';
import { authMiddleware } from '../middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

const storage = multer.diskStorage({
  destination: join(__dirname, '../../uploads/membres'),
  filename: (req, file, cb) => cb(null, `membre-${Date.now()}${extname(file.originalname)}`)
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// GET /api/membres — public
router.get('/', async (req, res) => {
  try {
    const result = await query(`SELECT * FROM membres WHERE actif=true ORDER BY ordre ASC`);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/admin/membres
router.post('/admin', authMiddleware, upload.single('photo'), async (req, res) => {
  const { nom, fonction, bio, initiales, ordre } = req.body;
  if (!nom) return res.status(400).json({ error: 'nom requis.' });
  const photo_path = req.file ? `uploads/membres/${req.file.filename}` : null;
  try {
    const result = await query(
      `INSERT INTO membres (nom, fonction, bio, photo_path, initiales, ordre)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [nom, fonction, bio, photo_path, initiales, ordre || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT /api/admin/membres/:id
router.put('/admin/:id', authMiddleware, upload.single('photo'), async (req, res) => {
  const { nom, fonction, bio, initiales, ordre, actif } = req.body;
  const photo_path = req.file ? `uploads/membres/${req.file.filename}` : undefined;
  try {
    const setClauses = ['nom=$1','fonction=$2','bio=$3','initiales=$4','ordre=$5','actif=$6'];
    const params = [nom, fonction, bio, initiales, ordre, actif !== 'false'];
    if (photo_path) { setClauses.push(`photo_path=$${params.length + 1}`); params.push(photo_path); }
    params.push(req.params.id);
    const result = await query(
      `UPDATE membres SET ${setClauses.join(',')} WHERE id=$${params.length} RETURNING *`, params
    );
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE /api/admin/membres/:id
router.delete('/admin/:id', authMiddleware, async (req, res) => {
  try {
    await query(`DELETE FROM membres WHERE id=$1`, [req.params.id]);
    res.status(204).send();
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
