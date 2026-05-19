import pool from './src/lib/db.js';

async function runMigration() {
  const client = await pool.connect();
  try {
    console.log("⚡ Début de la migration de la base de données...");
    
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
    
    console.log("✅ Base de données mise à jour avec succès (colonnes logo_path et lang ajoutées) !");
  } catch (err) {
    console.error("❌ Erreur lors de la migration :", err.message);
  } finally {
    client.release();
    process.exit(0);
  }
}

runMigration();
