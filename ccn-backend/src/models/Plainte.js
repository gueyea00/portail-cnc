import BaseModel from './BaseModel.js';
import { query } from '../lib/db.js';

class Plainte extends BaseModel {
  constructor() {
    super('plaintes');
  }

  static async findAll(statut) {
    let sql = `SELECT * FROM plaintes`;
    const params = [];
    if (statut) {
      params.push(statut);
      sql += ` WHERE statut=$1`;
    }
    sql += ` ORDER BY created_at DESC`;
    const result = await query(sql, params);
    return result.rows;
  }

  static async getStats() {
    const result = await query(`SELECT statut, COUNT(*) as count FROM plaintes GROUP BY statut`);
    return result.rows;
  }

  static async findById(id) {
    return await new Plainte().findById(id);
  }

  static async create(data) {
    return await new Plainte().create(data);
  }

  static async update(id, data) {
    return await new Plainte().update(id, data);
  }

  static async delete(id) {
    return await new Plainte().delete(id);
  }
}

export default Plainte;
