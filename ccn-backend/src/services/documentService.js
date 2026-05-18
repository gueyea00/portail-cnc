import Document from '../models/Document.js';

class DocumentService {
  static async getAllDocuments(categorie) {
    return await Document.findAll(categorie);
  }

  static async getAllDocumentsAdmin() {
    return await Document.findAllAdmin();
  }

  static async getDocumentById(id) {
    return await Document.findById(id);
  }

  static async createDocument(data) {
    return await Document.create(data);
  }

  static async updateDocument(id, data) {
    return await Document.update(id, data);
  }

  static async deleteDocument(id) {
    return await Document.delete(id);
  }
}

export default DocumentService;
