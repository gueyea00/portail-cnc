import { Router } from 'express';
import multer from 'multer';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { query } from '../lib/db.js';
import { authMiddleware } from '../middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

const storage = multer.diskStorage({
  destination: join(__dirname, '../../uploads/documents'),
  filename: (req, file, cb) => cb(null, `doc-${Date.now()}${extname(file.originalname)}`)
});
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

// GET /api/documents — public
router.get('/', async (req, res) => {
  try {
    const { categorie } = req.query;
    let sql = `SELECT * FROM documents`;
    const params = [];
    if (categorie) { params.push(categorie); sql += ` WHERE categorie=$1`; }
    sql += ` ORDER BY date_publication DESC`;
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/admin/documents
router.post('/admin', authMiddleware, upload.single('fichier'), async (req, res) => {
  const { titre, categorie, date_publication } = req.body;
  if (!titre || !req.file) return res.status(400).json({ error: 'titre et fichier requis.' });
  const taille = `${(req.file.size / 1024).toFixed(0)} Ko`;
  const type_fichier = extname(req.file.originalname).replace('.', '').toUpperCase();
  try {
    const result = await query(
      `INSERT INTO documents (titre, categorie, fichier_path, taille, type_fichier, date_publication)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [titre, categorie, `uploads/documents/${req.file.filename}`, taille, type_fichier, date_publication || new Date()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT /api/admin/documents/:id
router.put('/admin/:id', authMiddleware, upload.single('fichier'), async (req, res) => {
  const { titre, categorie, date_publication } = req.body;
  try {
    let sql, params;
    if (req.file) {
      const taille = `${(req.file.size / 1024).toFixed(0)} Ko`;
      const type_fichier = extname(req.file.originalname).replace('.', '').toUpperCase();
      sql = `UPDATE documents SET titre=$1, categorie=$2, date_publication=$3, fichier_path=$4, taille=$5, type_fichier=$6 WHERE id=$7 RETURNING *`;
      params = [titre, categorie, date_publication, `uploads/documents/${req.file.filename}`, taille, type_fichier, req.params.id];
    } else {
      sql = `UPDATE documents SET titre=$1, categorie=$2, date_publication=$3 WHERE id=$4 RETURNING *`;
      params = [titre, categorie, date_publication, req.params.id];
    }
    const result = await query(sql, params);
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE /api/admin/documents/:id
router.delete('/admin/:id', authMiddleware, async (req, res) => {
  try {
    await query(`DELETE FROM documents WHERE id=$1`, [req.params.id]);
    res.status(204).send();
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
