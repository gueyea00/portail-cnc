import { Router } from 'express';
import multer from 'multer';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { query } from '../lib/db.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

const storage = multer.diskStorage({
  destination: join(__dirname, '../../uploads/president'),
  filename: (req, file, cb) => cb(null, `president${extname(file.originalname)}`)
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// GET /api/parametres — public
router.get('/', async (req, res) => {
  try {
    const result = await query(`SELECT cle, valeur FROM parametres_site`);
    const obj = Object.fromEntries(result.rows.map(r => [r.cle, r.valeur]));
    res.json(obj);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT /api/admin/parametres — modifier (super_admin seulement)
router.put('/admin', authMiddleware, requireRole('super_admin'), upload.single('president_photo_file'), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) {
      updates.president_photo = `uploads/president/${req.file.filename}`;
    }
    for (const [cle, valeur] of Object.entries(updates)) {
      await query(
        `INSERT INTO parametres_site (cle, valeur, updated_at) VALUES ($1,$2,NOW())
         ON CONFLICT (cle) DO UPDATE SET valeur=$2, updated_at=NOW()`,
        [cle, valeur]
      );
    }
    const result = await query(`SELECT cle, valeur FROM parametres_site`);
    res.json(Object.fromEntries(result.rows.map(r => [r.cle, r.valeur])));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
