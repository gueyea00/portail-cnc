import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

class AdminService {
  static async getAllAdmins() {
    return await Admin.findAll();
  }

  static async getAdminById(id) {
    return await Admin.findById(id);
  }

  static async createAdmin(data) {
    if (data.password) {
      data.password_hash = await bcrypt.hash(data.password, 10);
      delete data.password;
    }
    return await Admin.create(data);
  }

  static async updateAdmin(id, data) {
    if (data.password) {
      data.password_hash = await bcrypt.hash(data.password, 10);
      delete data.password;
    }
    return await Admin.update(id, data);
  }

  static async deactivateAdmin(id) {
    return await Admin.delete(id);
  }
}

export default AdminService;
