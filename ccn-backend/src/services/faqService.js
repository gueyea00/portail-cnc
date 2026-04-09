import FAQ from '../models/FAQ.js';

class FAQService {
  static async getAllFaqs(filtre) {
    return await FAQ.findAll(filtre);
  }

  static async getFaqById(id) {
    return await FAQ.findById(id);
  }

  static async createFaq(data) {
    return await FAQ.create(data);
  }

  static async updateFaq(id, data) {
    return await FAQ.update(id, data);
  }

  static async deleteFaq(id) {
    return await FAQ.delete(id);
  }
}

export default FAQService;
