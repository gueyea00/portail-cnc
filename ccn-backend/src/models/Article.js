import BaseModel from './BaseModel.js';
import { query } from '../lib/db.js';

class Article extends BaseModel {
  constructor() {
    super('articles');
  }

  static async findAllPublished(options = {}) {
    const { categorie, limit = 20, offset = 0 } = options;
    let sql = `SELECT * FROM articles WHERE statut = 'publie'`;
    const params = [];
    if (categorie) {
      params.push(categorie);
      sql += ` AND categorie = $${params.length}`;
    }
    sql += ` ORDER BY date_publication DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
    
    const result = await query(sql, params);
    return result.rows;
  }

  static async findBySlug(slug) {
    const result = await query(`SELECT * FROM articles WHERE slug = $1`, [slug]);
    return result.rows[0];
  }

  static async findAllAdmin() {
    return await new Article().findAll({ orderBy: 'created_at DESC' });
  }

  static async create(data) {
    return await new Article().create(data);
  }

  static async update(id, data) {
    return await new Article().update(id, data);
  }

  static async delete(id) {
    return await new Article().delete(id);
  }
}

export default Article;
