import db from '../lib/db.js';

class SocialMediaService {
  static async getPluginParams() {
    try {
      const res = await db.query("SELECT cle, valeur FROM site_parameters WHERE cle LIKE 'plugin_%';");
      const params = {};
      res.rows.forEach(row => {
        params[row.cle] = row.valeur;
      });
      return params;
    } catch (err) {
      console.error("Erreur lors de la récupération des paramètres de plugin:", err);
      return {};
    }
  }

  static async shareArticle(article) {
    // Ne partager que si l'article est officiellement publié
    if (article.statut !== 'publie') {
      console.log("ℹ️ L'article n'est pas au statut 'publie', pas de partage automatique.");
      return;
    }

    const params = await this.getPluginParams();
    console.log("📢 Démarrage du partage automatique sur les réseaux sociaux pour l'article:", article.titre);

    // 1. Partage automatique LinkedIn
    if (params.plugin_linkedin_enabled === 'true' && params.plugin_linkedin_token) {
      await this.shareToLinkedIn(article, params.plugin_linkedin_page_id, params.plugin_linkedin_token);
    } else {
      console.log("ℹ️ Partage LinkedIn désactivé ou non configuré.");
    }

    // 2. Partage automatique Facebook
    if (params.plugin_facebook_enabled === 'true' && params.plugin_facebook_token) {
      await this.shareToFacebook(article, params.plugin_facebook_page_id, params.plugin_facebook_token);
    } else {
      console.log("ℹ️ Partage Facebook désactivé ou non configuré.");
    }
  }

  static async shareToLinkedIn(article, pageId, token) {
    try {
      const shareUrl = `http://localhost/actualites/${article.slug}`;
      const payload = {
        author: pageId || "urn:li:organization:123456",
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: {
              text: `📢 NOUVEL ARTICLE : ${article.titre}\n\n${article.extrait || ""}\n\nLire l'article complet ici : ${shareUrl}`
            },
            shareMediaCategory: "ARTICLE",
            media: [
              {
                status: "READY",
                description: {
                  text: article.extrait || "Actualité CNC Tchad"
                },
                originalUrl: shareUrl,
                title: {
                  text: article.titre
                }
              }
            ]
          }
        },
        visibility: {
          "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
      };

      console.log("🔗 Envoi du post vers LinkedIn API (Page ID:", payload.author, ")");

      // Fallback de simulation sécurisée pour les tokens de démonstration
      if (token.startsWith("mock") || token === "••••••••••••••••••••••••" || token.length < 20) {
        console.log("✅ [SIMULATION] Partage LinkedIn effectué avec succès !");
        return { success: true, simulated: true };
      }

      const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Restli-Protocol-Version": "2.0.0"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }

      console.log("✅ Partage LinkedIn réussi !", data);
      return data;
    } catch (error) {
      console.error("❌ Erreur lors du partage LinkedIn:", error.message);
    }
  }

  static async shareToFacebook(article, pageId, token) {
    try {
      const shareUrl = `http://localhost/actualites/${article.slug}`;
      const message = `📢 NOUVEL ARTICLE : ${article.titre}\n\n${article.extrait || ""}\n\nRetrouvez tous les détails sur notre portail : ${shareUrl}`;

      const realPageId = pageId || "me";
      const url = `https://graph.facebook.com/${realPageId}/feed`;

      console.log("🔗 Envoi du post vers Facebook API (Page ID:", realPageId, ")");

      // Fallback de simulation sécurisée pour les tokens de démonstration
      if (token.startsWith("mock") || token === "••••••••••••••••••••••••" || token.length < 20) {
        console.log("✅ [SIMULATION] Partage Facebook effectué avec succès !");
        return { success: true, simulated: true };
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: message,
          link: shareUrl,
          access_token: token
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }

      console.log("✅ Partage Facebook réussi !", data);
      return data;
    } catch (error) {
      console.error("❌ Erreur lors du partage Facebook:", error.message);
    }
  }
}

export default SocialMediaService;
