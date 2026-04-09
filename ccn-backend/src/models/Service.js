import BaseModel from './BaseModel.js';

class Service extends BaseModel {
  constructor() {
    super('services');
  }

  static async findAllActive() {
    return await new Service().findAll({ where: 'actif = true', orderBy: 'ordre ASC' });
  }

  static async findById(id) {
    return await new Service().findById(id);
  }

  static async create(data) {
    return await new Service().create(data);
  }

  static async update(id, data) {
    return await new Service().update(id, data);
  }

  static async delete(id) {
    return await new Service().delete(id);
  }
}

export default Service;
