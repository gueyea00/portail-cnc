import Galerie from '../models/Galerie.js';

class GalerieService {
  static async getPublishedPhotos() {
    return await Galerie.findAllPublished();
  }

  static async getAllPhotosAdmin() {
    return await Galerie.findAllAdmin();
  }

  static async getPhotoById(id) {
    return await Galerie.findById(id);
  }

  static async createPhoto(data) {
    return await Galerie.create(data);
  }

  static async updatePhoto(id, data) {
    return await Galerie.update(id, data);
  }

  static async deletePhoto(id) {
    return await Galerie.delete(id);
  }
}

export default GalerieService;
