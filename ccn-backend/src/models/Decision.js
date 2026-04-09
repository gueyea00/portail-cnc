import BaseModel from './BaseModel.js';

class Decision extends BaseModel {
  constructor() {
    super('decisions');
  }

  static async findAllPublished() {
    return await new Decision().findAll({ where: 'publie = true', orderBy: 'date_decision DESC' });
  }

  static async findAllAdmin() {
    return await new Decision().findAll({ orderBy: 'created_at DESC' });
  }

  static async findById(id) {
    return await new Decision().findById(id);
  }

  static async create(data) {
    return await new Decision().create(data);
  }

  static async update(id, data) {
    return await new Decision().update(id, data);
  }

  static async delete(id) {
    return await new Decision().delete(id);
  }
}

export default Decision;
