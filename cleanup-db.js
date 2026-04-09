import { query } from './ccn-backend/src/lib/db.js';

async function cleanup() {
  try {
    console.log("🧹 Nettoyage des doublons...");
    
    // On vide les tables qui ont été dupliquées
    const tables = [
      'membres', 
      'services', 
      'missions', 
      'historique', 
      'faq', 
      'etapes_intervention',
      'articles',
      'galerie_items'
    ];
    
    for (const table of tables) {
      console.log(`- Troncature de ${table}...`);
      await query(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`);
    }

    console.log("✅ Tables vidées. Prêt pour un nouveau seed propre.");
  } catch (err) {
    console.error("❌ Erreur pendant le nettoyage:", err.message);
  } finally {
    process.exit(0);
  }
}

cleanup();
