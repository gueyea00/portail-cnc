import Article from '../models/Article.js';

class ArticleService {
  static async getPublishedArticles(options) {
    return await Article.findAllPublished(options);
  }

  static async getArticleBySlug(slug) {
    return await Article.findBySlug(slug);
  }

  static async getAllArticlesAdmin() {
    return await Article.findAllAdmin();
  }

  static async createArticle(data) {
    return await Article.create(data);
  }

  static async updateArticle(id, data) {
    return await Article.update(id, data);
  }

  static async deleteArticle(id) {
    return await Article.delete(id);
  }
}

export default ArticleService;
