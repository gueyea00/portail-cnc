import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Token manquant. Accès refusé.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token invalide ou expiré.' });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.admin) return res.status(401).json({ error: 'Non authentifié.' });
    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({ error: 'Permissions insuffisantes.' });
    }
    next();
  };
}
