import BaseModel from './BaseModel.js';

class Mission extends BaseModel {
  constructor() {
    super('missions');
  }

  static async findAll() {
    return await new Mission().findAll({ orderBy: 'ordre ASC' });
  }

  static async findAllAdmin() {
    return await new Mission().findAll({ orderBy: 'ordre ASC' });
  }

  static async findById(id) {
    return await new Mission().findById(id);
  }

  static async create(data) {
    return await new Mission().create(data);
  }

  static async update(id, data) {
    return await new Mission().update(id, data);
  }

  static async delete(id) {
    return await new Mission().delete(id);
  }
}

export default Mission;
