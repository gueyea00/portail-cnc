import MenuItem from '../models/MenuItem.js';

class MenuService {
  static async getActiveMenuItems() {
    return await MenuItem.findAllActive();
  }

  static async getAllMenuItemsAdmin() {
    return await MenuItem.findAllAdmin();
  }

  static async getMenuItemById(id) {
    return await MenuItem.findById(id);
  }

  static async createMenuItem(data) {
    return await MenuItem.create(data);
  }

  static async updateMenuItem(id, data) {
    return await MenuItem.update(id, data);
  }

  static async deleteMenuItem(id) {
    return await MenuItem.delete(id);
  }
}

export default MenuService;
