import GalerieService from '../services/galerieService.js';

class GalerieController {
  static async getPublished(req, res) {
    try {
      const photos = await GalerieService.getPublishedPhotos();
      res.json(photos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAllAdmin(req, res) {
    try {
      const photos = await GalerieService.getAllPhotosAdmin();
      res.json(photos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const { titre, description, date_evenement, categorie, gradient, ordre } = req.body;
      if (!titre) return res.status(400).json({ error: 'titre requis.' });
      
      const data = {
        titre,
        description,
        date_evenement,
        categorie,
        image_path: req.file ? `uploads/galerie/${req.file.filename}` : null,
        gradient: gradient || 'from-primary to-gold',
        ordre: ordre || 0
      };
      
      const photo = await GalerieService.createPhoto(data);
      res.status(201).json(photo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const data = { ...req.body };
      if (req.file) data.image_path = `uploads/galerie/${req.file.filename}`;
      if (data.publie === 'false') data.publie = false;
      if (data.publie === 'true') data.publie = true;
      
      const photo = await GalerieService.updatePhoto(req.params.id, data);
      res.json(photo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      await GalerieService.deletePhoto(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default GalerieController;
