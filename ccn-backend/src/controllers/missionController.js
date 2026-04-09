import MissionService from '../services/missionService.js';
import { query } from '../lib/db.js';

class MissionController {
  async getAll(req, res) {
    try {
      const missions = await MissionService.getAllMissions();
      res.json(missions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const mission = await MissionService.getMissionById(req.params.id);
      if (!mission) return res.status(404).json({ error: 'Mission non trouvée' });
      res.json(mission);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const mission = await MissionService.createMission(req.body);
      res.status(201).json(mission);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const mission = await MissionService.updateMission(req.params.id, req.body);
      res.json(mission);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await MissionService.deleteMission(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // --- Historique ---
  async getAllHistorique(req, res) {
    try {
      const records = await query('SELECT * FROM historique ORDER BY ordre ASC, annee DESC');
      res.json(records.rows || []);
    } catch (err) { 
      console.error('Erreur MissionController:', err);
      res.status(500).json({ error: err.message }); 
    }
  }

  async createHistorique(req, res) {
    try {
      const { annee, description, ordre } = req.body;
      const result = await query(
        'INSERT INTO historique (annee, description, ordre) VALUES ($1, $2, $3) RETURNING *',
        [annee, description, ordre || 0]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) { 
      console.error('Erreur MissionController:', err);
      res.status(500).json({ error: err.message }); 
    }
  }

  async updateHistorique(req, res) {
    try {
      const { annee, description, ordre } = req.body;
      const result = await query(
        'UPDATE historique SET annee=$1, description=$2, ordre=$3 WHERE id=$4 RETURNING *',
        [annee, description, ordre, req.params.id]
      );
      res.json(result.rows[0]);
    } catch (err) { 
      console.error('Erreur MissionController:', err);
      res.status(500).json({ error: err.message }); 
    }
  }

  async deleteHistorique(req, res) {
    try {
      await query('DELETE FROM historique WHERE id=$1', [req.params.id]);
      res.json({ message: 'Historique supprimé' });
    } catch (err) { 
      console.error('Erreur MissionController:', err);
      res.status(500).json({ error: err.message }); 
    }
  }

  // --- Étapes d'intervention ---
  async getAllEtapes(req, res) {
    try {
      const records = await query('SELECT * FROM etapes_intervention ORDER BY ordre ASC, id ASC');
      res.json(records.rows || []);
    } catch (err) { 
      console.error('Erreur MissionController:', err);
      res.status(500).json({ error: err.message }); 
    }
  }

  async createEtape(req, res) {
    try {
      const { titre, description, ordre } = req.body;
      const result = await query(
        'INSERT INTO etapes_intervention (titre, description, ordre) VALUES ($1, $2, $3) RETURNING *',
        [titre, description, ordre || 0]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) { 
      console.error('Erreur MissionController:', err);
      res.status(500).json({ error: err.message }); 
    }
  }

  async updateEtape(req, res) {
    try {
      const { titre, description, ordre } = req.body;
      const result = await query(
        'UPDATE etapes_intervention SET titre=$1, description=$2, ordre=$3 WHERE id=$4 RETURNING *',
        [titre, description, ordre, req.params.id]
      );
      res.json(result.rows[0]);
    } catch (err) { 
      console.error('Erreur MissionController:', err);
      res.status(500).json({ error: err.message }); 
    }
  }

  async deleteEtape(req, res) {
    try {
      await query('DELETE FROM etapes_intervention WHERE id=$1', [req.params.id]);
      res.json({ message: 'Étape supprimée' });
    } catch (err) { 
      console.error('Erreur MissionController:', err);
      res.status(500).json({ error: err.message }); 
    }
  }
}

export default new MissionController();
