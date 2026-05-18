import MembreService from '../services/membreService.js';

class MembreController {
  static async getActive(req, res) {
    try {
      const membres = await MembreService.getActiveMembres();
      res.json(membres);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAllAdmin(req, res) {
    try {
      const membres = await MembreService.getAllMembresAdmin();
      res.json(membres);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const membre = await MembreService.getMembreById(req.params.id);
      if (!membre) return res.status(404).json({ error: 'Membre non trouvé' });
      res.json(membre);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const data = {
        ...req.body,
        photo_path: req.file ? `uploads/membres/${req.file.filename}` : null,
        ordre: req.body.ordre || 0
      };
      const membre = await MembreService.createMembre(data);
      res.status(201).json(membre);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const data = { ...req.body };
      if (req.file) data.photo_path = `uploads/membres/${req.file.filename}`;
      if (data.actif === 'false') data.actif = false;
      if (data.actif === 'true') data.actif = true;
      
      const membre = await MembreService.updateMembre(req.params.id, data);
      res.json(membre);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      await MembreService.deleteMembre(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default MembreController;
