import LienService from '../services/lienService.js';

class LienController {
  static async getAll(req, res) {
    try {
      const liens = await LienService.getAll();
      res.json(liens);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const { nom, url, description, categorie, ordre } = req.body;
      if (!nom || !url) return res.status(400).json({ error: 'nom et url requis.' });
      const lien = await LienService.create({
        nom,
        url,
        description: description || null,
        categorie: categorie || 'Autre',
        ordre: ordre || 0,
      });
      res.status(201).json(lien);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const data = { ...req.body };
      if (data.ordre) data.ordre = parseInt(data.ordre);
      const lien = await LienService.update(req.params.id, data);
      res.json(lien);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      await LienService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default LienController;
