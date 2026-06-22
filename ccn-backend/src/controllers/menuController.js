import MenuService from '../services/menuService.js';

class MenuController {
  static buildTree(items) {
    const map = {};
    const roots = [];
    
    // Convert and index items
    items.forEach(item => {
      map[item.id] = { ...item, label: item.titre, path: item.url, children: [] };
    });

    // Build the tree
    items.forEach(item => {
      if (item.parent_id && map[item.parent_id]) {
        map[item.parent_id].children.push(map[item.id]);
      } else {
        roots.push(map[item.id]);
      }
    });

    // Remove empty children arrays
    Object.values(map).forEach(item => {
      if (item.children.length === 0) delete item.children;
    });

    return roots;
  }

  static async getActive(req, res) {
    try {
      const menuItems = await MenuService.getActiveMenuItems();
      const tree = MenuController.buildTree(menuItems);
      res.json(tree);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAllAdmin(req, res) {
    try {
      const menuItems = await MenuService.getAllMenuItemsAdmin();
      // Map to label and path for the admin dashboard
      const mapped = menuItems.map(item => ({ ...item, label: item.titre, path: item.url }));
      res.json(mapped);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const menuItem = await MenuService.getMenuItemById(req.params.id);
      if (!menuItem) return res.status(404).json({ error: 'Élément de menu non trouvé' });
      res.json({ ...menuItem, label: menuItem.titre, path: menuItem.url });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static _mapPayload(data) {
    const payload = { ...data };
    if (payload.label !== undefined) {
      payload.titre = payload.label;
      delete payload.label;
    }
    if (payload.path !== undefined) {
      payload.url = payload.path;
      delete payload.path;
    }
    // If parent_id is empty string, make it null
    if (payload.parent_id === "") {
      payload.parent_id = null;
    }
    return payload;
  }

  static async create(req, res) {
    try {
      const payload = MenuController._mapPayload(req.body);
      const menuItem = await MenuService.createMenuItem(payload);
      res.status(201).json({ ...menuItem, label: menuItem.titre, path: menuItem.url });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const payload = MenuController._mapPayload(req.body);
      const menuItem = await MenuService.updateMenuItem(req.params.id, payload);
      res.json({ ...menuItem, label: menuItem.titre, path: menuItem.url });
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
