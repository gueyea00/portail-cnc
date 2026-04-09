import LienInstitutionnel from '../models/LienInstitutionnel.js';

class LienService {
  static async getAll() {
    return await LienInstitutionnel.findAll();
  }

  static async getById(id) {
    return await LienInstitutionnel.findById(id);
  }

  static async create(data) {
    return await LienInstitutionnel.create(data);
  }

  static async update(id, data) {
    return await LienInstitutionnel.update(id, data);
  }

  static async delete(id) {
    return await LienInstitutionnel.delete(id);
  }
}

export default LienService;
