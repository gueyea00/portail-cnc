import BaseModel from './BaseModel.js';

class FAQ extends BaseModel {
  constructor() {
    super('faq');
  }

  static async findAll(filtre = 'Tous') {
    const where = filtre === 'Tous' ? 'actif = true' : `actif = true AND theme = '${filtre}'`;
    return await new FAQ().findAll({ where, orderBy: 'ordre ASC' });
  }

  static async findById(id) {
    return await new FAQ().findById(id);
  }

  static async create(data) {
    return await new FAQ().create(data);
  }

  static async update(id, data) {
    return await new FAQ().update(id, data);
  }

  static async delete(id) {
    return await new FAQ().delete(id);
  }
}

export default FAQ;
