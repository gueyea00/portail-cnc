import pool from './src/lib/db.js';

async function runMigration() {
  const client = await pool.connect();
  try {
    console.log("⚡ Début de la migration de la base de données...");

    // Création de la table menu_items si elle n'existe pas
    await client.query(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id SERIAL PRIMARY KEY,
        label TEXT NOT NULL,
        path TEXT NOT NULL,
        parent_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
        ordre INTEGER DEFAULT 0,
        actif BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Ajout de la colonne logo_path à la table liens_institutionnels si elle n'existe pas
    await client.query(`
      ALTER TABLE liens_institutionnels
      ADD COLUMN IF NOT EXISTS logo_path TEXT;
    `);

    // Ajout de la colonne lang à la table documents si elle n'existe pas
    await client.query(`
      ALTER TABLE documents
      ADD COLUMN IF NOT EXISTS lang TEXT DEFAULT 'fr';
    `);

    console.log("✅ Base de données mise à jour avec succès !");
  } catch (err) {
    console.error("❌ Erreur lors de la migration :", err.message);
  } finally {
    client.release();
    process.exit(0);
  }
}

runMigration();
