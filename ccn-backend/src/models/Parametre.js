import { query } from '../lib/db.js';

class Parametre {
  static async findAll() {
    const result = await query(`SELECT cle, valeur FROM parametres_site`);
    return Object.fromEntries(result.rows.map(r => [r.cle, r.valeur]));
  }

  static async updateAll(data) {
    for (const [cle, valeur] of Object.entries(data)) {
      await query(
        `INSERT INTO parametres_site (cle, valeur, updated_at) VALUES ($1,$2,NOW())
         ON CONFLICT (cle) DO UPDATE SET valeur=$2, updated_at=NOW()`,
        [cle, valeur]
      );
    }
    return await this.findAll();
  }
}

export default Parametre;
