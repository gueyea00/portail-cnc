import Mission from '../models/Mission.js';

class MissionService {
  static async getAllMissions() {
    return await Mission.findAll();
  }

  static async getAllMissionsAdmin() {
    return await Mission.findAllAdmin();
  }

  static async getMissionById(id) {
    return await Mission.findById(id);
  }

  static async createMission(data) {
    // Eventuelle logique métier ici (validation, etc.)
    return await Mission.create(data);
  }

  static async updateMission(id, data) {
    return await Mission.update(id, data);
  }

  static async deleteMission(id) {
    return await Mission.delete(id);
  }
}

export default MissionService;
