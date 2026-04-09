import { query } from '../lib/db.js';

class BaseModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async findAll(options = {}) {
    const { where = '1=1', orderBy = 'id ASC' } = options;
    const result = await query(`SELECT * FROM ${this.tableName} WHERE ${where} ORDER BY ${orderBy}`);
    return result.rows;
  }

  async findById(id) {
    const result = await query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
    return result.rows[0];
  }

  async create(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    const result = await query(
      `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`,
      values
    );
    return result.rows[0];
  }

  async update(id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
    const result = await query(
      `UPDATE ${this.tableName} SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    await query(`DELETE FROM ${this.tableName} WHERE id = $1`, [id]);
    return true;
  }
}

export default BaseModel;
