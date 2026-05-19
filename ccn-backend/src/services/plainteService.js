import Plainte from '../models/Plainte.js';

class PlainteService {
  static async getAllPlaintes(statut) {
    return await Plainte.findAll(statut);
  }

  static async getPlainteStats() {
    return await Plainte.getStats();
  }

  static async getPlainteById(id) {
    return await Plainte.findById(id);
  }

  static async getPlainteByReference(reference) {
    return await Plainte.findByReference(reference);
  }

  static async createPlainte(data) {
    return await Plainte.create(data);
  }

  static async updatePlainte(id, data) {
    return await Plainte.update(id, data);
  }

  static async deletePlainte(id) {
    return await Plainte.delete(id);
  }
}

export default PlainteService;
