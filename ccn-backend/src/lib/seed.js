import pool from './db.js';
import bcrypt from 'bcryptjs';

export async function seedDatabase(client) {
  const db = client || pool;

  console.log('🌱 Insertion des données initiales via JavaScript...');

  // 1. Admin
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);
  
  await db.query(`
    INSERT INTO admins (username, email, password_hash, role)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash;
  `, ['admin', 'admin@cnc-tchad.td', hashedAdminPassword, 'super_admin']);

  // 2. Parametres
  const initialParams = {
    'president_nom': 'M. Vissia Baranga',
    'president_titre': 'Président du Conseil',
    'president_message': 'Le Conseil National de la Concurrence œuvre sans relâche pour garantir un marché équitable...',
    'footer_telephone': '+235 22 52 12 34',
    'footer_email': 'contact@cnc-tchad.td',
    'footer_adresse': 'Avenue Charles de Gaulle, N\'Djamena, Tchad',
    'hero_title': 'Réguler pour une économie prospère au Tchad',
    'hero_subtitle': 'Le garant de la saine concurrence et de la protection des consommateurs sur le marché national.',
    'horaires_ouverture': '07h30 – 15h30',
    'siege_social': 'N\'Djamena, Tchad',
    'presentation_p1': 'Le Conseil National de la Concurrence (CNC) de la République du Tchad est une autorité administrative indépendante chargée de veiller au respect des règles de concurrence sur le marché national.',
    'presentation_p2': 'Le CNC intervient pour prévenir, détecter et sanctionner les pratiques anticoncurrentielles telles que les ententes illicites, les abus de position dominante et les pratiques restrictives de concurrence.',
    'presentation_p3': 'Créé dans le cadre des réformes visant à moderniser l\'économie tchadienne, le CNC s\'est progressivement imposé comme un acteur clé dans la régulation économique.',
    'footer_description': 'Autorité administrative indépendante chargée de veiller au respect des règles de la concurrence en République du Tchad.'
  };
  for (const [cle, valeur] of Object.entries(initialParams)) {
    await db.query(`INSERT INTO parametres_site (cle, valeur) VALUES ($1, $2) ON CONFLICT (cle) DO NOTHING;`, [cle, valeur]);
  }

  // 3. Services
  const services = [
    ['Dépôt de plainte', 'Soumettez une plainte formelle concernant des pratiques anticoncurrentielles.', 'FileWarning', '/plainte', 1],
    ['Signalement anonyme', 'Signalez une pratique suspecte de manière anonyme.', 'ShieldAlert', '/signalement', 2],
    ['Suivi de dossier', 'Consultez l\'état d\'avancement de votre dossier.', 'ClipboardList', '/suivi-projet', 3],
    ['Demande d\'avis', 'Sollicitez l\'avis du CNC sur une question de concurrence.', 'MessageSquare', '#', 4],
    ['Prise de rendez-vous', 'Planifiez un rendez-vous avec les services du CNC.', 'Calendar', '#', 5]
  ];
  for (const s of services) {
    await db.query(`INSERT INTO services (titre, description, icone, lien, ordre) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (titre) DO UPDATE SET lien = EXCLUDED.lien, description = EXCLUDED.description, icone = EXCLUDED.icone, ordre = EXCLUDED.ordre;`, s);
  }

  // 4. Membres
  const membres = [
    ['M. Vissia Baranga', 'Président du Conseil', 'VB', 1],
    ['Mme Amina Oumar Djibrine', 'Vice-Présidente', 'AO', 2],
    ['M. Ahmat Abakar Moussa', 'Conseiller — Affaires juridiques', 'AA', 3],
    ['Mme Fatimé Hassan Abakar', 'Conseillère — Études économiques', 'FH', 4],
    ['M. Djibril Ousmane Mahamat', 'Conseiller — Enquêtes', 'DO', 5],
    ['M. Youssouf Ali Brahim', 'Conseiller — Coopération', 'YA', 6]
  ];
  for (const m of membres) {
    await db.query(`INSERT INTO membres (nom, fonction, initiales, ordre) VALUES ($1, $2, $3, $4) ON CONFLICT (nom) DO NOTHING;`, m);
  }

  // 5. Articles
  const articles = [
    ['decision-entente-secteur-telecoms', 'Le CNC sanctionne une entente dans le secteur des télécommunications', 'Le Conseil National de la Concurrence a rendu une décision historique sanctionnant trois opérateurs de télécommunications pour entente illicite sur les tarifs.', 'Le Conseil National de la Concurrence a rendu, le 15 janvier 2025, une décision majeure dans le secteur des télécommunications au Tchad.', 'communique', 'publie', '2025-01-15'],
    ['enquete-secteur-hydrocarbures', 'Ouverture d\'une enquête dans le secteur des hydrocarbures', 'Le CNC ouvre une enquête approfondie sur les pratiques tarifaires dans le secteur de la distribution des produits pétroliers.', 'Le Conseil National de la Concurrence a décidé d\'ouvrir une enquête sectorielle sur les pratiques observées dans la distribution des produits pétroliers.', 'enquete', 'publie', '2025-02-03'],
    ['forum-cemac-concurrence-2025', 'Le CNC participe au Forum régional CEMAC sur la concurrence', 'La délégation tchadienne a participé activement au 5e Forum régional sur la politique de concurrence dans l\'espace CEMAC.', 'Du 20 au 22 mars 2025, le Conseil National de la Concurrence du Tchad a participé au 5e Forum régional sur la politique de concurrence organisé par la CEMAC à Douala.', 'evenement', 'publie', '2025-03-22']
  ];
  for (const a of articles) {
    await db.query(`INSERT INTO articles (slug, titre, extrait, contenu, categorie, statut, date_publication) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (slug) DO NOTHING;`, a);
  }

  // 6. Galerie
  const galerie = [
    ['Réunion plénière du Conseil', 'Session plénière ordinaire du CNC', '2025-01-20', 'Réunions du Conseil', 'from-primary to-gold', 1],
    ['Session de sensibilisation — secteur commerce', 'Atelier de sensibilisation des commerçants de N\'Djamena', '2025-02-05', 'Sessions de sensibilisation', 'from-[#0284C7] to-[#38BDF8]', 2],
    ['Forum régional CEMAC 2024', 'Participation au forum sur la concurrence en zone CEMAC', '2024-11-15', 'Événements', 'from-gold to-primary', 3]
  ];
  for (const g of galerie) {
    await db.query(`INSERT INTO galerie_items (titre, description, date_evenement, categorie, gradient, ordre) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (titre) DO NOTHING;`, g);
  }

  // 7. Missions
  const missions = [
    ["Contrôle des pratiques anticoncurrentielles", "Identifier et sanctionner les ententes illicites entre entreprises, les abus de position dominante et les pratiques commerciales déloyales qui nuisent à l'économie.", "Shield", 1],
    ["Régulation des concentrations", "Examiner les projets de fusions, d'acquisitions et de regroupements d'entreprises pour prévenir la création de monopoles nuisibles à la concurrence.", "GitMerge", 2],
    ["Lutte contre la concurrence déloyale", "Combattre les pratiques abusives telles que le dénigrement, la désorganisation ou la confusion visant à détourner la clientèle d'un concurrent.", "Scale", 3],
    ["Avis consultatifs", "Émettre des avis sur les projets de textes législatifs ou réglementaires ayant un impact sur la concurrence et conseiller le Gouvernement sur ces questions.", "FileText", 4],
    ["Études de marché", "Réaliser des analyses approfondies sur le fonctionnement de secteurs spécifiques de l'économie pour identifier d'éventuels dysfonctionnements concurrentiels.", "BarChart3", 5],
    ["Sensibilisation et promotion", "Informer les opérateurs économiques et les consommateurs sur les règles de la concurrence et promouvoir une culture de loyauté commerciale au Tchad.", "Users", 6],
    ["Protection des consommateurs", "Veiller à ce que les consommateurs bénéficient d'un choix diversifié de produits et services à des prix compétitifs grâce à un marché dynamique et ouvert.", "CheckCircle", 7],
    ["Enquêtes et investigations", "Mener des enquêtes d'office ou sur saisine pour constater les infractions aux règles de la concurrence et recueillir les preuves nécessaires aux procédures.", "Search", 8]
  ];
  for (const m of missions) {
    await db.query(`INSERT INTO missions (titre, description, icone, ordre) VALUES ($1, $2, $3, $4) ON CONFLICT (titre) DO NOTHING;`, m);
  }

  // 8. Historique
  const historique = [
    ["2015", "Loi N°014/PR/2015 relative à la concurrence.", 1],
    ["2016", "Décret N°2016/042 organisation et fonctionnement.", 2],
    ["2017", "Installation officielle du premier Conseil.", 3],
    ["2018", "Lancement des enquêtes et règlement intérieur.", 4],
    ["2020", "Renforcement des capacités (Partenaires).", 5],
    ["2024", "Bilan : 47 enquêtes, 12 décisions, 8 avis.", 6]
  ];
  for (const h of historique) {
    await db.query(`INSERT INTO historique (annee, description, ordre) VALUES ($1, $2, $3) ON CONFLICT (annee, description) DO NOTHING;`, h);
  }

  // 9. FAQ
  const faq = [
    ["Qu'est-ce que le Conseil National de la Concurrence ?", "Le Conseil National de la Concurrence (CNC) est une autorité administrative indépendante créée par la loi N°014/PR/2015. Il est chargé de veiller au respect des règles de la concurrence sur le marché tchadien, de sanctionner les pratiques anticoncurrentielles et de promouvoir une culture de concurrence loyale.", "Généralités", 1],
    ["Quelles sont les pratiques anticoncurrentielles sanctionnées par le CNC ?", "Le CNC sanctionne principalement les ententes illicites (accords entre concurrents pour fixer les prix ou se répartir les marchés), les abus de position dominante (utilisation abusive d'une position forte sur un marché) et les pratiques commerciales déloyales.", "Généralités", 2],
    ["Comment déposer une plainte auprès du CNC ?", "Vous pouvez déposer une plainte directement en ligne via notre formulaire de dépôt de plainte, par courrier à notre siège à N'Djamena, ou en vous présentant physiquement dans nos locaux aux heures d'ouverture (07h30 - 15h30).", "Plaintes", 3]
  ];
  for (const f of faq) {
    await db.query(`INSERT INTO faq (question, reponse, theme, ordre) VALUES ($1, $2, $3, $4) ON CONFLICT (question) DO NOTHING;`, f);
  }
  // 10. Etapes d'intervention
  const etapes = [
    [1, 'Saisine', 'Plainte, signalement ou auto-saisine.'],
    [2, 'Enquête', 'Collecte de preuves et auditions.'],
    [3, 'Instruction', 'Débat contradictoire des parties.'],
    [4, 'Délibération', 'Conseil en séance plénière.'],
    [5, 'Décision', 'Notification et publication officielle.'],
  ];
  for (const e of etapes) {
    await db.query(`INSERT INTO etapes_intervention (ordre, titre, description) VALUES ($1, $2, $3) ON CONFLICT (titre) DO NOTHING;`, e);
  }
}
