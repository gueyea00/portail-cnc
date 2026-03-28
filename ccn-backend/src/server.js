import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';

// Routes
import authRoutes from './routes/auth.js';
import articlesRoutes from './routes/articles.js';
import decisionsRoutes from './routes/decisions.js';
import documentsRoutes from './routes/documents.js';
import galerieRoutes from './routes/galerie.js';
import membresRoutes from './routes/membres.js';
import plaintesRoutes from './routes/plaintes.js';
import parametresRoutes from './routes/parametres.js';
import adminsRoutes from './routes/admins.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 8080;

// Créer les dossiers uploads si inexistants
['uploads', 'uploads/decisions', 'uploads/documents', 'uploads/galerie', 'uploads/membres', 'uploads/president', 'uploads/articles'].forEach(dir => {
  mkdirSync(join(__dirname, '..', dir), { recursive: true });
});

// Middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fichiers statiques : uploads et interface admin
app.use('/uploads', express.static(join(__dirname, '../uploads')));
app.use('/admin', express.static(join(__dirname, '../admin')));

// Redirection /admin → /admin/login.html
app.get('/admin', (req, res) => res.redirect('/admin/login.html'));

// ============================================================
// Routes API
// ============================================================
app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// Auth
app.use('/api/admin', authRoutes);

// Contenu public
app.use('/api/articles', articlesRoutes);
app.use('/api/decisions', decisionsRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/galerie', galerieRoutes);
app.use('/api/membres', membresRoutes);
app.use('/api/plaintes', plaintesRoutes);
app.use('/api/parametres', parametresRoutes);

// Admin — routes protégées supplémentaires
app.use('/api/articles', articlesRoutes);
app.use('/api/decisions', decisionsRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/galerie', galerieRoutes);
app.use('/api/membres', membresRoutes);
app.use('/api/plaintes', plaintesRoutes);
app.use('/api/parametres', parametresRoutes);
app.use('/api/admin/admins', adminsRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée.' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Serveur CNC Tchad démarré sur http://localhost:${PORT}`);
  console.log(`📊 Interface Admin  : http://localhost:${PORT}/admin/login.html`);
  console.log(`🔗 API Health       : http://localhost:${PORT}/health\n`);
});
