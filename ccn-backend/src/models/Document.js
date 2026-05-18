import BaseModel from './BaseModel.js';
import { query } from '../lib/db.js';

class Document extends BaseModel {
  constructor() {
    super('documents');
  }

  static async findAll(categorie) {
    let sql = `SELECT * FROM documents`;
    const params = [];
    if (categorie) {
      params.push(categorie);
      sql += ` WHERE categorie=$1`;
    }
    sql += ` ORDER BY date_publication DESC`;
    const result = await query(sql, params);
    return result.rows;
  }

  static async findAllAdmin() {
    return await new Document().findAll({ orderBy: 'date_publication DESC' });
  }

  static async findById(id) {
    return await new Document().findById(id);
  }

  static async create(data) {
    return await new Document().create(data);
  }

  static async update(id, data) {
    return await new Document().update(id, data);
  }

  static async delete(id) {
    return await new Document().delete(id);
  }
}

export default Document;
