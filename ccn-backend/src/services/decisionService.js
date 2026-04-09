import Decision from '../models/Decision.js';

class DecisionService {
  static async getPublishedDecisions() {
    return await Decision.findAllPublished();
  }

  static async getAllDecisionsAdmin() {
    return await Decision.findAllAdmin();
  }

  static async getDecisionById(id) {
    return await Decision.findById(id);
  }

  static async createDecision(data) {
    return await Decision.create(data);
  }

  static async updateDecision(id, data) {
    return await Decision.update(id, data);
  }

  static async deleteDecision(id) {
    return await Decision.delete(id);
  }
}

export default DecisionService;
