import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || '148.230.124.48',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'cncbd',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

pool.on('error', (err) => {
  console.error('Erreur PostgreSQL :', err.message);
});

export const query = (text, params) => pool.query(text, params);
export default pool;
