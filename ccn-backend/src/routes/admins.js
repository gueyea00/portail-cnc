import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../lib/db.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = Router();

// GET /api/admin/admins — liste (super_admin)
router.get('/', authMiddleware, requireRole('super_admin'), async (req, res) => {
  try {
    const result = await query(`SELECT id, username, email, role, actif, derniere_connexion, created_at FROM admins ORDER BY created_at`);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/admin/admins — créer un compte
router.post('/', authMiddleware, requireRole('super_admin'), async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username et password requis.' });
  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await query(
      `INSERT INTO admins (username, email, password_hash, role)
       VALUES ($1,$2,$3,$4) RETURNING id, username, email, role, actif`,
      [username, email, hash, role || 'editeur']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT /api/admin/admins/:id — modifier rôle / statut
router.put('/:id', authMiddleware, requireRole('super_admin'), async (req, res) => {
  const { role, actif, email } = req.body;
  try {
    const result = await query(
      `UPDATE admins SET role=$1, actif=$2, email=$3 WHERE id=$4 RETURNING id, username, email, role, actif`,
      [role, actif, email, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PATCH /api/admin/admins/:id/password — réinitialiser mot de passe
router.patch('/:id/password', authMiddleware, requireRole('super_admin'), async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Nouveau mot de passe requis.' });
  try {
    const hash = await bcrypt.hash(password, 10);
    await query(`UPDATE admins SET password_hash=$1 WHERE id=$2`, [hash, req.params.id]);
    res.json({ message: 'Mot de passe mis à jour.' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE /api/admin/admins/:id — désactiver (soft delete)
router.delete('/:id', authMiddleware, requireRole('super_admin'), async (req, res) => {
  try {
    await query(`UPDATE admins SET actif=false WHERE id=$1`, [req.params.id]);
    res.json({ message: 'Compte désactivé.' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
