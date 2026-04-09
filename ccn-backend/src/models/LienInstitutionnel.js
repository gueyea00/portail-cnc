import BaseModel from './BaseModel.js';

class LienInstitutionnel extends BaseModel {
  constructor() {
    super('liens_institutionnels');
  }

  static async findAll() {
    return await new LienInstitutionnel().findAll({ orderBy: 'ordre ASC, created_at DESC' });
  }

  static async findById(id) {
    return await new LienInstitutionnel().findById(id);
  }

  static async create(data) {
    return await new LienInstitutionnel().create(data);
  }

  static async update(id, data) {
    return await new LienInstitutionnel().update(id, data);
  }

  static async delete(id) {
    return await new LienInstitutionnel().delete(id);
  }
}

export default LienInstitutionnel;
