import PlainteService from '../services/plainteService.js';

class PlainteController {
  static async create(req, res) {
    try {
      const { description } = req.body;
      if (!description) return res.status(400).json({ error: 'description requise.' });
      
      const reference = `CNC-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      
      // Gérer les fichiers
      let fichiers_paths = [];
      if (req.files && req.files.length > 0) {
        fichiers_paths = req.files.map(file => `/uploads/plaintes/${file.filename}`);
      }
      
      const data = { 
        ...req.body, 
        reference,
        fichiers: JSON.stringify(fichiers_paths)
      };
      
      const plainte = await PlainteService.createPlainte(data);
      res.status(201).json({ message: 'Plainte enregistrée.', reference: plainte.reference });
    } catch (err) {
      console.error('Erreur creation plainte:', err);
      res.status(500).json({ error: err.message });
    }
  }

  static async getAllAdmin(req, res) {
    try {
      const { statut } = req.query;
      const plaintes = await PlainteService.getAllPlaintes(statut);
      res.json(plaintes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getStats(req, res) {
    try {
      const stats = await PlainteService.getPlainteStats();
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const plainte = await PlainteService.getPlainteById(req.params.id);
      if (!plainte) return res.status(404).json({ error: 'Plainte non trouvée' });
      res.json(plainte);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getByReference(req, res) {
    try {
      const { reference } = req.params;
      if (!reference) return res.status(400).json({ error: 'Référence requise.' });
      
      const plainte = await PlainteService.getPlainteByReference(reference.trim().toUpperCase());
      if (!plainte) return res.status(404).json({ error: 'Dossier/Plainte non trouvé avec cette référence.' });
      
      // Filtrer les informations sensibles pour préserver la vie privée des citoyens
      const publicPlainte = {
        reference: plainte.reference,
        nom: plainte.nom ? `${plainte.nom.substring(0, 1)}***` : '',
        prenom: plainte.prenom ? `${plainte.prenom.substring(0, 1)}***` : '',
        type_pratique: plainte.type_pratique,
        entreprise_concernee: plainte.entreprise_concernee,
        secteur: plainte.secteur,
        statut: plainte.statut,
        created_at: plainte.created_at,
        updated_at: plainte.updated_at
      };
      
      res.json(publicPlainte);
    } catch (err) {
      console.error('Erreur getByReference:', err);
      res.status(500).json({ error: err.message });
    }
  }

  static async updateStatut(req, res) {
    try {
      const { statut } = req.body;
      const plainte = await PlainteService.updatePlainte(req.params.id, { statut, updated_at: new Date() });
      res.json(plainte);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateNote(req, res) {
    try {
      const { note_interne } = req.body;
      const plainte = await PlainteService.updatePlainte(req.params.id, { note_interne, updated_at: new Date() });
      res.json(plainte);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default PlainteController;
