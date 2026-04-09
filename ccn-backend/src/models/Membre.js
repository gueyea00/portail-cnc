import BaseModel from './BaseModel.js';

class Membre extends BaseModel {
  constructor() {
    super('membres');
  }

  static async findAllActive() {
    return await new Membre().findAll({ where: 'actif = true', orderBy: 'ordre ASC' });
  }

  static async findById(id) {
    return await new Membre().findById(id);
  }

  static async create(data) {
    return await new Membre().create(data);
  }

  static async update(id, data) {
    return await new Membre().update(id, data);
  }

  static async delete(id) {
    return await new Membre().delete(id);
  }
}

export default Membre;
