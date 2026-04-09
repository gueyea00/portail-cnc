import DecisionService from '../services/decisionService.js';

class DecisionController {
  static async getPublished(req, res) {
    try {
      const decisions = await DecisionService.getPublishedDecisions();
      res.json(decisions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAllAdmin(req, res) {
    try {
      const decisions = await DecisionService.getAllDecisionsAdmin();
      res.json(decisions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const { reference, titre, resume, date_decision, secteur, publie } = req.body;
      if (!reference || !titre) return res.status(400).json({ error: 'reference et titre requis.' });
      
      const data = {
        reference,
        titre,
        resume,
        date_decision,
        secteur,
        pdf_path: req.file ? `uploads/decisions/${req.file.filename}` : null,
        publie: publie === 'true'
      };
      
      const decision = await DecisionService.createDecision(data);
      res.status(201).json(decision);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const data = { ...req.body };
      if (req.file) data.pdf_path = `uploads/decisions/${req.file.filename}`;
      if (data.publie === 'true') data.publie = true;
      if (data.publie === 'false') data.publie = false;
      
      const decision = await DecisionService.updateDecision(req.params.id, data);
      res.json(decision);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      await DecisionService.deleteDecision(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default DecisionController;
