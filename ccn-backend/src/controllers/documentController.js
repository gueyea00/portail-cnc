import { extname } from 'path';
import DocumentService from '../services/documentService.js';

class DocumentController {
  static async getAll(req, res) {
    try {
      const { categorie } = req.query;
      const docs = await DocumentService.getAllDocuments(categorie);
      res.json(docs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const doc = await DocumentService.getDocumentById(req.params.id);
      if (!doc) return res.status(404).json({ error: 'Document non trouvé' });
      res.json(doc);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const { titre, categorie, date_publication } = req.body;
      if (!titre || !req.file) return res.status(400).json({ error: 'titre et fichier requis.' });
      
      const data = {
        titre,
        categorie,
        fichier_path: `uploads/documents/${req.file.filename}`,
        taille: `${(req.file.size / 1024).toFixed(0)} Ko`,
        type_fichier: extname(req.file.originalname).replace('.', '').toUpperCase(),
        date_publication: date_publication || new Date()
      };
      
      const doc = await DocumentService.createDocument(data);
      res.status(201).json(doc);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const data = { ...req.body };
      if (req.file) {
        data.fichier_path = `uploads/documents/${req.file.filename}`;
        data.taille = `${(req.file.size / 1024).toFixed(0)} Ko`;
        data.type_fichier = extname(req.file.originalname).replace('.', '').toUpperCase();
      }
      
      const doc = await DocumentService.updateDocument(req.params.id, data);
      res.json(doc);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      await DocumentService.deleteDocument(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default DocumentController;
