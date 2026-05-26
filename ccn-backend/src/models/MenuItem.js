import BaseModel from './BaseModel.js';

class MenuItem extends BaseModel {
  constructor() {
    super('menu_items');
  }

  static async findAllActive() {
    return await new MenuItem().findAll({ where: 'actif = true', orderBy: 'ordre ASC' });
  }

  static async findAllAdmin() {
    return await new MenuItem().findAll({ orderBy: 'ordre ASC' });
  }

  static async findById(id) {
    return await new MenuItem().findById(id);
  }

  static async create(data) {
    return await new MenuItem().create(data);
  }

  static async update(id, data) {
    return await new MenuItem().update(id, data);
  }

  static async delete(id) {
    return await new MenuItem().delete(id);
  }
}

export default MenuItem;
