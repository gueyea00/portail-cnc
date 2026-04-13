import ParametreService from '../services/parametreService.js';

class ParametreController {
  static async getAll(req, res) {
    try {
      const params = await ParametreService.getParametres();
      res.json(params);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const updates = { ...req.body };
      if (req.file) {
        updates.president_photo_path = `uploads/president/${req.file.filename}`;
      }
      const params = await ParametreService.updateParametres(updates);
      res.json(params);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default ParametreController;
