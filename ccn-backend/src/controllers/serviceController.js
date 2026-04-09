import AppService from '../services/appService.js';

class ServiceController {
  static async getActive(req, res) {
    try {
      const services = await AppService.getActiveServices();
      res.json(services);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const service = await AppService.getServiceById(req.params.id);
      if (!service) return res.status(404).json({ error: 'Service non trouvé' });
      res.json(service);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const service = await AppService.createService(req.body);
      res.status(201).json(service);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const service = await AppService.updateService(req.params.id, req.body);
      res.json(service);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      await AppService.deleteService(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default ServiceController;
