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
      
      if (req.files) {
        if (req.files.president_photo_file) {
          updates.president_photo_path = `uploads/site/${req.files.president_photo_file[0].filename}`;
        }
        if (req.files.hero_bg_file) {
          updates.hero_bg_path = `uploads/site/${req.files.hero_bg_file[0].filename}`;
        }
        if (req.files.logo_file) {
          updates.logo_path = `uploads/site/${req.files.logo_file[0].filename}`;
        }
        if (req.files.armoiries_file) {
          updates.armoiries_path = `uploads/site/${req.files.armoiries_file[0].filename}`;
        }
      }
      
      const params = await ParametreService.updateParametres(updates);
      res.json(params);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default ParametreController;
