import { query } from './ccn-backend/src/lib/db.js';

async function check() {
  try {
    const res = await query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
    console.log("Tables:", res.rows.map(r => r.table_name));
    
    const hist = await query("SELECT * FROM historique");
    console.log("Historique count:", hist.rowCount);
  } catch (err) {
    console.error("DB Error:", err.message);
  } finally {
    process.exit(0);
  }
}

check();
