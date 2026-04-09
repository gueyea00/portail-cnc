import BaseModel from './BaseModel.js';

class Galerie extends BaseModel {
  constructor() {
    super('galerie_items');
  }

  static async findAllPublished() {
    return await new Galerie().findAll({ where: 'publie = true', orderBy: 'ordre ASC, created_at DESC' });
  }

  static async findAllAdmin() {
    return await new Galerie().findAll({ orderBy: 'ordre ASC' });
  }

  static async findById(id) {
    return await new Galerie().findById(id);
  }

  static async create(data) {
    return await new Galerie().create(data);
  }

  static async update(id, data) {
    return await new Galerie().update(id, data);
  }

  static async delete(id) {
    return await new Galerie().delete(id);
  }
}

export default Galerie;
