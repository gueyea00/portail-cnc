import pg from 'pg';
import { query } from '../lib/db.js';

class BaseModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  // Workaround: Use simple string concatenation with escaping because parameter binding is failing.
  // NOTE: This is less secure than parameterized queries.
  async findAll(options = {}) {
    const { where = '1=1', orderBy = 'id ASC' } = options;
    const result = await query(`SELECT * FROM ${this.tableName} WHERE ${where} ORDER BY ${orderBy}`);
    return result.rows;
  }

  async findById(id) {
    const escapedId = pg.escapeLiteral(String(id));
    const result = await query(`SELECT * FROM ${this.tableName} WHERE id = ${escapedId}`);
    return result.rows[0];
  }

  async create(data) {
    const keys = Object.keys(data);
    const values = Object.values(data).map(val => (typeof val === 'string' ? pg.escapeLiteral(val) : val));
    const sql = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${values.join(', ')}) RETURNING *`;
    const result = await query(sql);
    return result.rows[0];
  }

  async update(id, data) {
    const keys = Object.keys(data);
    const setClause = keys.map((key, i) => {
      const val = data[key];
      const escapedVal = typeof val === 'string' ? pg.escapeLiteral(val) : val;
      return `${key} = ${escapedVal}`;
    }).join(', ');
    const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ${pg.escapeLiteral(String(id))} RETURNING *`;
    const result = await query(sql);
    return result.rows[0];
  }

  async delete(id) {
    await query(`DELETE FROM ${this.tableName} WHERE id = ${pg.escapeLiteral(String(id))}`);
    return true;
  }
}

export default BaseModel;
