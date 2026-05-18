import FAQService from '../services/faqService.js';

class FAQController {
  static async getAll(req, res) {
    try {
      const { theme } = req.query;
      const faqs = await FAQService.getAllFaqs(theme);
      res.json(faqs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAllAdmin(req, res) {
    try {
      const faqs = await FAQService.getAllFaqsAdmin();
      res.json(faqs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const faq = await FAQService.getFaqById(req.params.id);
      if (!faq) return res.status(404).json({ error: 'FAQ non trouvée' });
      res.json(faq);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const faq = await FAQService.createFaq(req.body);
      res.status(201).json(faq);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const faq = await FAQService.updateFaq(req.params.id, req.body);
      res.json(faq);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      await FAQService.deleteFaq(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default FAQController;
