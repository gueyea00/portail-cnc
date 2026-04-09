import ArticleService from '../services/articleService.js';

class ArticleController {
  static async getPublished(req, res) {
    try {
      const articles = await ArticleService.getPublishedArticles(req.query);
      res.json(articles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getBySlug(req, res) {
    try {
      const article = await ArticleService.getArticleBySlug(req.params.slug);
      if (!article) return res.status(404).json({ error: 'Article non trouvé' });
      res.json(article);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAllAdmin(req, res) {
    try {
      const articles = await ArticleService.getAllArticlesAdmin();
      res.json(articles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const data = {
        ...req.body,
        image_path: req.file ? `uploads/articles/${req.file.filename}` : req.body.image_path || null,
        statut: req.body.statut || 'brouillon',
        date_publication: req.body.date_publication || new Date()
      };
      const article = await ArticleService.createArticle(data);
      res.status(201).json(article);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const data = { ...req.body };
      if (req.file) data.image_path = `uploads/articles/${req.file.filename}`;
      data.updated_at = new Date();
      
      const article = await ArticleService.updateArticle(req.params.id, data);
      res.json(article);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      await ArticleService.deleteArticle(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default ArticleController;
