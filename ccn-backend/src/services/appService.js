import Service from '../models/Service.js';

class AppService {
  static async getActiveServices() {
    return await Service.findAllActive();
  }

  static async getServiceById(id) {
    return await Service.findById(id);
  }

  static async createService(data) {
    return await Service.create(data);
  }

  static async updateService(id, data) {
    return await Service.update(id, data);
  }

  static async deleteService(id) {
    return await Service.delete(id);
  }
}

export default AppService;
