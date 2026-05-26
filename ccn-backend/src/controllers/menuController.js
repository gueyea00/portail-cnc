import MenuService from '../services/menuService.js';

class MenuController {
  static async getActive(req, res) {
    try {
      const menuItems = await MenuService.getActiveMenuItems();
      res.json(menuItems);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAllAdmin(req, res) {
    try {
      const menuItems = await MenuService.getAllMenuItemsAdmin();
      res.json(menuItems);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const menuItem = await MenuService.getMenuItemById(req.params.id);
      if (!menuItem) return res.status(404).json({ error: 'Élément de menu non trouvé' });
      res.json(menuItem);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const menuItem = await MenuService.createMenuItem(req.body);
      res.status(201).json(menuItem);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const menuItem = await MenuService.updateMenuItem(req.params.id, req.body);
      res.json(menuItem);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      await MenuService.deleteMenuItem(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default MenuController;
