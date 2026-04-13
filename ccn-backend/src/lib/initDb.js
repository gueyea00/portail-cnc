import { schema } from './schema.js';
import pool from './db.js';
import dotenv from 'dotenv';
dotenv.config();

async function initDb() {
  let client;
  try {
    console.log('🔗 Connexion à PostgreSQL...');
    client = await pool.connect();
    
    console.log('📋 Création des tables...');
    await client.query(schema);
    
    const { seedDatabase } = await import('./seed.js');
    await seedDatabase(client);
    
    console.log('✅ Base de données initialisée avec succès !');
    if (client) client.release();
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur lors de l\'initialisation :', err.message);
    if (client) client.release();
    process.exit(1); 
  }
}

initDb();
