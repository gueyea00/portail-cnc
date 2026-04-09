import pool from './ccn-backend/src/lib/db.js';

async function reset() {
  const client = await pool.connect();
  try {
    console.log("🔥 Suppression de toutes les tables...");
    const tables = [
      'admins', 'articles', 'decisions', 'documents', 'galerie_items', 
      'membres', 'plaintes', 'services', 'parametres_site', 
      'missions', 'historique', 'faq', 'etapes_intervention'
    ];
    for (const table of tables) {
      await client.query(`DROP TABLE IF EXISTS ${table} CASCADE`);
    }
    console.log("✅ Base de données remise à zéro.");
  } catch (err) {
    console.error("❌ Erreur reset:", err.message);
  } finally {
    client.release();
    process.exit(0);
  }
}

reset();
