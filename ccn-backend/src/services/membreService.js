import Membre from '../models/Membre.js';

class MembreService {
  static async getActiveMembres() {
    return await Membre.findAllActive();
  }

  static async getMembreById(id) {
    return await Membre.findById(id);
  }

  static async createMembre(data) {
    return await Membre.create(data);
  }

  static async updateMembre(id, data) {
    return await Membre.update(id, data);
  }

  static async deleteMembre(id) {
    return await Membre.delete(id);
  }
}

export default MembreService;
