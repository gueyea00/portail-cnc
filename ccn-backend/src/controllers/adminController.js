import AdminService from '../services/adminService.js';

class AdminController {
  static async getAll(req, res) {
    try {
      const admins = await AdminService.getAllAdmins();
      res.json(admins);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) return res.status(400).json({ error: 'username et password requis.' });
      
      const admin = await AdminService.createAdmin(req.body);
      res.status(201).json(admin);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const admin = await AdminService.updateAdmin(req.params.id, req.body);
      res.json(admin);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updatePassword(req, res) {
    try {
      const { password } = req.body;
      if (!password) return res.status(400).json({ error: 'Nouveau mot de passe requis.' });
      await AdminService.updateAdmin(req.params.id, { password });
      res.json({ message: 'Mot de passe mis à jour.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      await AdminService.deactivateAdmin(req.params.id);
      res.json({ message: 'Compte désactivé.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default AdminController;
