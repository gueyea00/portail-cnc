import Parametre from '../models/Parametre.js';

class ParametreService {
  static async getParametres() {
    return await Parametre.findAll();
  }

  static async updateParametres(data) {
    return await Parametre.updateAll(data);
  }
}

export default ParametreService;
