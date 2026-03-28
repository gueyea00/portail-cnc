import { Router } from 'express';
import { query } from '../lib/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Génération référence unique
function genRef() {
  const y = new Date().getFullYear();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CNC-${y}-${rand}`;
}

// POST /api/plaintes — soumission publique
router.post('/', async (req, res) => {
  const { nom, prenom, email, telephone, qualite, type_pratique, description, entreprise_concernee } = req.body;
  if (!description) return res.status(400).json({ error: 'description requise.' });
  try {
    const reference = genRef();
    const result = await query(
      `INSERT INTO plaintes (reference, nom, prenom, email, telephone, qualite, type_pratique, description, entreprise_concernee)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING reference`,
      [reference, nom, prenom, email, telephone, qualite, type_pratique, description, entreprise_concernee]
    );
    res.status(201).json({ message: 'Plainte enregistrée.', reference: result.rows[0].reference });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/admin/plaintes — liste admin
router.get('/admin/all', authMiddleware, async (req, res) => {
  try {
    const { statut } = req.query;
    let sql = `SELECT * FROM plaintes`;
    const params = [];
    if (statut) { params.push(statut); sql += ` WHERE statut=$1`; }
    sql += ` ORDER BY created_at DESC`;
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/admin/plaintes/stats
router.get('/admin/stats', authMiddleware, async (req, res) => {
  try {
    const result = await query(
      `SELECT statut, COUNT(*) as count FROM plaintes GROUP BY statut`
    );
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/admin/plaintes/:id
router.get('/admin/:id', authMiddleware, async (req, res) => {
  try {
    const result = await query(`SELECT * FROM plaintes WHERE id=$1`, [req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ error: 'Plainte non trouvée.' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PATCH /api/admin/plaintes/:id/statut
router.patch('/admin/:id/statut', authMiddleware, async (req, res) => {
  const { statut } = req.body;
  try {
    const result = await query(
      `UPDATE plaintes SET statut=$1, updated_at=NOW() WHERE id=$2 RETURNING *`,
      [statut, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT /api/admin/plaintes/:id/note
router.put('/admin/:id/note', authMiddleware, async (req, res) => {
  const { note_interne } = req.body;
  try {
    const result = await query(
      `UPDATE plaintes SET note_interne=$1, updated_at=NOW() WHERE id=$2 RETURNING *`,
      [note_interne, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
