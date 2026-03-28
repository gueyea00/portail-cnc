import { Router } from 'express';
import multer from 'multer';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { query } from '../lib/db.js';
import { authMiddleware } from '../middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

const storage = multer.diskStorage({
  destination: join(__dirname, '../../uploads/decisions'),
  filename: (req, file, cb) => cb(null, `decision-${Date.now()}${extname(file.originalname)}`)
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// GET /api/decisions — public
router.get('/', async (req, res) => {
  try {
    const result = await query(`SELECT * FROM decisions WHERE publie=true ORDER BY date_decision DESC`);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/admin/decisions/all
router.get('/admin/all', authMiddleware, async (req, res) => {
  try {
    const result = await query(`SELECT * FROM decisions ORDER BY created_at DESC`);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/admin/decisions + upload PDF
router.post('/admin', authMiddleware, upload.single('pdf'), async (req, res) => {
  const { reference, titre, resume, date_decision, secteur, publie } = req.body;
  if (!reference || !titre) return res.status(400).json({ error: 'reference et titre requis.' });
  const pdf_path = req.file ? `uploads/decisions/${req.file.filename}` : null;
  try {
    const result = await query(
      `INSERT INTO decisions (reference, titre, resume, date_decision, secteur, pdf_path, publie)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [reference, titre, resume, date_decision, secteur, pdf_path, publie === 'true']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT /api/admin/decisions/:id
router.put('/admin/:id', authMiddleware, upload.single('pdf'), async (req, res) => {
  const { titre, resume, date_decision, secteur, publie } = req.body;
  const pdf_path = req.file ? `uploads/decisions/${req.file.filename}` : undefined;
  try {
    const setClauses = ['titre=$1','resume=$2','date_decision=$3','secteur=$4','publie=$5'];
    const params = [titre, resume, date_decision, secteur, publie === 'true'];
    if (pdf_path) { setClauses.push(`pdf_path=$${params.length + 1}`); params.push(pdf_path); }
    params.push(req.params.id);
    const result = await query(
      `UPDATE decisions SET ${setClauses.join(',')} WHERE id=$${params.length} RETURNING *`, params
    );
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE /api/admin/decisions/:id
router.delete('/admin/:id', authMiddleware, async (req, res) => {
  try {
    await query(`DELETE FROM decisions WHERE id=$1`, [req.params.id]);
    res.status(204).send();
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
