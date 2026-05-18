import { Router } from 'express';
import MissionController from '../controllers/missionController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// --- Routes PUBLIQUES ---
router.get('/', MissionController.getAll);
router.get('/historique', MissionController.getAllHistorique);
router.get('/etapes', MissionController.getAllEtapes);
router.get('/:id', MissionController.getById);

// --- Routes PRIVÉES (Admin) ---
// Missions
router.get('/admin/all', authMiddleware, MissionController.getAllAdmin);
router.post('/admin', authMiddleware, MissionController.create);
router.put('/admin/:id', authMiddleware, MissionController.update);
router.delete('/admin/:id', authMiddleware, MissionController.delete);

// Évènements Historiques
router.get('/admin/historique', authMiddleware, MissionController.getAllHistorique);
router.post('/admin/historique', authMiddleware, MissionController.createHistorique);
router.put('/admin/historique/:id', authMiddleware, MissionController.updateHistorique);
router.delete('/admin/historique/:id', authMiddleware, MissionController.deleteHistorique);

// Étapes d'intervention
router.get('/admin/etapes', authMiddleware, MissionController.getAllEtapes);
router.post('/admin/etapes', authMiddleware, MissionController.createEtape);
router.put('/admin/etapes/:id', authMiddleware, MissionController.updateEtape);
router.delete('/admin/etapes/:id', authMiddleware, MissionController.deleteEtape);

export default router;
