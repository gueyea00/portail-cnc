import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../lib/db.js';

const router = Router();

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Identifiants requis.' });
  }
  try {
    const result = await query(
      'SELECT * FROM admins WHERE username = $1 AND actif = true',
      [username]
    );
    const admin = result.rows[0];
    if (!admin) return res.status(401).json({ error: 'Identifiants incorrects.' });

    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) return res.status(401).json({ error: 'Identifiants incorrects.' });

    await query(
      'UPDATE admins SET derniere_connexion = NOW() WHERE id = $1',
      [admin.id]
    );

    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    res.json({
      token,
      admin: { id: admin.id, username: admin.username, email: admin.email, role: admin.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
