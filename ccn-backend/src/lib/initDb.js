import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pool from './db.js';
import dotenv from 'dotenv';
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

async function initDb() {
  const client = await pool.connect();
  try {
    console.log('🔗 Connexion à PostgreSQL...');
    
    const schema = await readFile(join(__dirname, '../../schema.sql'), 'utf8');
    console.log('📋 Création des tables...');
    await client.query(schema);
    
    const seed = await readFile(join(__dirname, '../../seed.sql'), 'utf8');
    console.log('🌱 Insertion des données initiales...');
    await client.query(seed);
    
    console.log('✅ Base de données initialisée avec succès !');
    console.log('👤 Compte admin créé : admin / admin123');
  } catch (err) {
    console.error('❌ Erreur lors de l\'initialisation :', err.message);
  } finally {
    client.release();
    process.exit(0);
  }
}

initDb();
