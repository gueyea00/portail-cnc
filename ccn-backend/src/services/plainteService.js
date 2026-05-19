import Plainte from '../models/Plainte.js';

class PlainteService {
  static async getAllPlaintes(statut) {
    return await Plainte.findAll(statut);
  }

  static async getPlainteStats() {
    return await Plainte.getStats();
  }

  static async getPlainteById(id) {
    return await Plainte.findById(id);
  }

  static async getPlainteByReference(reference) {
    // L'URL de l'API Externe du nouveau microservice tchad-service
    const externalApiUrl = process.env.EXTERNAL_SUIVI_API_URL || "http://localhost:5010/v1/dossiers";
    
    try {
      // 1. Appel HTTP GET vers l'API externe
      const response = await fetch(`${externalApiUrl}/${encodeURIComponent(reference)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          // 'Authorization': `Bearer ${process.env.EXTERNAL_API_KEY}` // Si l'API nécessite un token
        }
      });

      if (!response.ok) {
        if (response.status === 404) return null; // Dossier non trouvé
        throw new Error(`L'API externe a retourné une erreur: ${response.status}`);
      }

      // 2. Récupération de la réponse de l'API externe
      const externalData = await response.json();
      
      // 3. Mapping des données (On adapte les champs de l'API externe au format attendu par notre frontend)
      return {
        reference: externalData.reference || externalData.id || reference,
        nom: externalData.nom || externalData.lastName || "N/A",
        prenom: externalData.prenom || externalData.firstName || "N/A",
        type_pratique: externalData.type_pratique || externalData.sujet || "Dossier Externe",
        entreprise_concernee: externalData.entreprise_concernee || externalData.cible || "Non spécifié",
        secteur: externalData.secteur || "Général",
        statut: externalData.statut || externalData.status || "en_cours", // Doit idéalement être : recue, en_cours, ou traite
        created_at: externalData.created_at || externalData.dateCreation || new Date().toISOString(),
        updated_at: externalData.updated_at || new Date().toISOString()
      };
    } catch (error) {
      console.error("Erreur de communication avec l'API Externe:", error);
      throw new Error("Le service de vérification externe est temporairement indisponible.");
    }
  }

  static async createPlainte(data) {
    return await Plainte.create(data);
  }

  static async updatePlainte(id, data) {
    return await Plainte.update(id, data);
  }

  static async deletePlainte(id) {
    return await Plainte.delete(id);
  }
}

export default PlainteService;
