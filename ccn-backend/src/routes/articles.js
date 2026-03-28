import { Router } from 'express';
import { query } from '../lib/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// GET /api/articles — public (seulement les publiés)
router.get('/', async (req, res) => {
  try {
    const { categorie, limit = 20, offset = 0 } = req.query;
    let sql = `SELECT * FROM articles WHERE statut = 'publie'`;
    const params = [];
    if (categorie) { params.push(categorie); sql += ` AND categorie = $${params.length}`; }
    sql += ` ORDER BY date_publication DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/articles/:slug — public
router.get('/:slug', async (req, res) => {
  try {
    const result = await query(`SELECT * FROM articles WHERE slug = $1`, [req.params.slug]);
    if (!result.rows[0]) return res.status(404).json({ error: 'Article non trouvé.' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/admin/articles — admin (tous les statuts)
router.get('/admin/all', authMiddleware, async (req, res) => {
  try {
    const result = await query(`SELECT * FROM articles ORDER BY created_at DESC`);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/admin/articles — créer
router.post('/admin', authMiddleware, async (req, res) => {
  const { slug, titre, extrait, contenu, categorie, image_url, statut, date_publication } = req.body;
  if (!slug || !titre) return res.status(400).json({ error: 'slug et titre requis.' });
  try {
    const result = await query(
      `INSERT INTO articles (slug, titre, extrait, contenu, categorie, image_url, statut, date_publication)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [slug, titre, extrait, contenu, categorie, image_url, statut || 'brouillon', date_publication || new Date()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT /api/admin/articles/:id — modifier
router.put('/admin/:id', authMiddleware, async (req, res) => {
  const { titre, extrait, contenu, categorie, image_url, statut, date_publication } = req.body;
  try {
    const result = await query(
      `UPDATE articles SET titre=$1, extrait=$2, contenu=$3, categorie=$4, image_url=$5,
       statut=$6, date_publication=$7, updated_at=NOW() WHERE id=$8 RETURNING *`,
      [titre, extrait, contenu, categorie, image_url, statut, date_publication, req.params.id]
    );
    if (!result.rows[0]) return res.status(404).json({ error: 'Article non trouvé.' });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PATCH /api/admin/articles/:id/statut
router.patch('/admin/:id/statut', authMiddleware, async (req, res) => {
  const { statut } = req.body;
  try {
    const result = await query(
      `UPDATE articles SET statut=$1, updated_at=NOW() WHERE id=$2 RETURNING *`,
      [statut, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE /api/admin/articles/:id
router.delete('/admin/:id', authMiddleware, async (req, res) => {
  try {
    await query(`DELETE FROM articles WHERE id=$1`, [req.params.id]);
    res.status(204).send();
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
