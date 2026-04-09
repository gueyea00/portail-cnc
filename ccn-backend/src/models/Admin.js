import BaseModel from './BaseModel.js';
import { query } from '../lib/db.js';

class Admin extends BaseModel {
  constructor() {
    super('admins');
  }

  static async findAll() {
    const result = await query(`SELECT id, username, email, role, actif, derniere_connexion, created_at FROM admins ORDER BY created_at`);
    return result.rows;
  }

  static async findById(id) {
    const result = await query(`SELECT id, username, email, role, actif, derniere_connexion, created_at FROM admins WHERE id = $1`, [id]);
    return result.rows[0];
  }

  static async create(data) {
    return await new Admin().create(data);
  }

  static async update(id, data) {
    return await new Admin().update(id, data);
  }

  static async delete(id) {
    // Soft delete for admins as per current implementation
    const result = await query(`UPDATE admins SET actif=false WHERE id=$1 RETURNING *`, [id]);
    return result.rows[0];
  }
}

export default Admin;
