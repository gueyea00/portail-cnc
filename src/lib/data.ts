// ============================================================
// Données mock réalistes pour le portail CNC Tchad
// ============================================================

export interface Article {
  slug: string;
  titre: string;
  extrait: string;
  contenu: string;
  date: string;
  categorie: "communique" | "enquete" | "evenement";
  image?: string;
}

// Fin types existants

export interface DocumentCNC {
  titre: string;
  categorie: string;
  date: string;
  taille: string;
  type: string;
}

export interface FAQ {
  question: string;
  reponse: string;
  theme: string;
}

export interface Membre {
  nom: string;
  fonction: string;
  initiales: string;
  couleur: string;
}

export interface GalerieItem {
  id: number;
  titre: string;
  description: string;
  date: string;
  categorie: string;
  gradient: string;
}

// --- Missions ---
export const missions = [
  {
    titre: "Contrôle des pratiques anticoncurrentielles",
    description: "Identifier et sanctionner les ententes illicites entre entreprises, les abus de position dominante et les pratiques commerciales déloyales qui nuisent à l'économie.",
    icone: "Shield",
  },
  {
    titre: "Régulation des concentrations",
    description: "Examiner les projets de fusions, d'acquisitions et de regroupements d'entreprises pour prévenir la création de monopoles nuisibles à la concurrence.",
    icone: "GitMerge",
  },
  {
    titre: "Lutte contre la concurrence déloyale",
    description: "Combattre les pratiques abusives telles que le dénigrement, la désorganisation ou la confusion visant à détourner la clientèle d'un concurrent.",
    icone: "Scale",
  },
  {
    titre: "Avis consultatifs",
    description: "Émettre des avis sur les projets de textes législatifs ou réglementaires ayant un impact sur la concurrence et conseiller le Gouvernement sur ces questions.",
    icone: "FileText",
  },
  {
    titre: "Études de marché",
    description: "Réaliser des analyses approfondies sur le fonctionnement de secteurs spécifiques de l'économie pour identifier d'éventuels dysfonctionnements concurrentiels.",
    icone: "BarChart3",
  },
  {
    titre: "Sensibilisation et promotion",
    description: "Informer les opérateurs économiques et les consommateurs sur les règles de la concurrence et promouvoir une culture de loyauté commerciale au Tchad.",
    icone: "Users",
  },
  {
    titre: "Protection des consommateurs",
    description: "Veiller à ce que les consommateurs bénéficient d'un choix diversifié de produits et services à des prix compétitifs grâce à un marché dynamique et ouvert.",
    icone: "CheckCircle",
  },
  {
    titre: "Enquêtes et investigations",
    description: "Mener des enquêtes d'office ou sur saisine pour constater les infractions aux règles de la concurrence et recueillir les preuves nécessaires aux procédures.",
    icone: "Search",
  },
];

// --- Articles d'actualité ---
export const articles: Article[] = [
  {
    slug: "decision-entente-secteur-telecoms",
    titre: "Le CNC sanctionne une entente dans le secteur des télécommunications",
    extrait: "Le Conseil National de la Concurrence a rendu une décision historique sanctionnant trois opérateurs de télécommunications pour entente illicite sur les tarifs.",
    contenu: `Le Conseil National de la Concurrence a rendu, le 15 janvier 2025, une décision majeure dans le secteur des télécommunications au Tchad. Trois opérateurs ont été reconnus coupables d'une entente illicite visant à fixer de manière concertée les tarifs de communication mobile.\n\nCette pratique, qui perdurait depuis 2022, a eu pour effet de priver les consommateurs tchadiens du bénéfice de la concurrence par les prix. Les amendes prononcées s'élèvent à un total de 2,5 milliards de francs CFA.\n\nLe Président du CNC a souligné que « cette décision marque la détermination du Conseil à faire respecter les règles de la concurrence dans tous les secteurs de l'économie nationale ».`,
    date: "2025-01-15",
    categorie: "communique",
  },
  {
    slug: "enquete-secteur-hydrocarbures",
    titre: "Ouverture d'une enquête dans le secteur des hydrocarbures",
    extrait: "Le CNC ouvre une enquête approfondie sur les pratiques tarifaires dans le secteur de la distribution des produits pétroliers au Tchad.",
    contenu: `Le Conseil National de la Concurrence a décidé d'ouvrir une enquête sectorielle sur les pratiques observées dans la distribution des produits pétroliers sur l'ensemble du territoire national.\n\nCette enquête fait suite à de nombreux signalements de consommateurs et d'associations dénonçant des écarts de prix significatifs entre les stations-service, notamment dans les zones rurales.\n\nLes enquêteurs du CNC procéderont à des auditions et à des vérifications sur pièces et sur place auprès de l'ensemble des acteurs de la chaîne de distribution.`,
    date: "2025-02-03",
    categorie: "enquete",
  },
  {
    slug: "forum-cemac-concurrence-2025",
    titre: "Le CNC participe au Forum régional CEMAC sur la concurrence",
    extrait: "La délégation tchadienne a participé activement au 5e Forum régional sur la politique de concurrence dans l'espace CEMAC.",
    contenu: `Du 20 au 22 mars 2025, le Conseil National de la Concurrence du Tchad a participé au 5e Forum régional sur la politique de concurrence organisé par la CEMAC à Douala, Cameroun.\n\nLa délégation tchadienne, conduite par le Président du CNC, a présenté les avancées du Tchad en matière de régulation de la concurrence et a partagé son expérience sur la mise en place d'un cadre juridique adapté aux réalités économiques de la sous-région.`,
    date: "2025-03-22",
    categorie: "evenement",
  },
  {
    slug: "communique-sensibilisation-n-djamena",
    titre: "Campagne de sensibilisation à N'Djamena",
    extrait: "Le CNC lance une vaste campagne de sensibilisation auprès des commerçants et opérateurs économiques de N'Djamena sur les pratiques anticoncurrentielles.",
    contenu: `Le Conseil National de la Concurrence a lancé, le 5 février 2025, une campagne de sensibilisation d'envergure à N'Djamena. Cette initiative vise à informer les opérateurs économiques sur les règles de la concurrence et les sanctions encourues en cas de violation.\n\nDes ateliers interactifs ont été organisés dans les principaux marchés de la capitale, réunissant plus de 500 participants.`,
    date: "2025-02-05",
    categorie: "communique",
  },
  {
    slug: "rapport-annuel-2024",
    titre: "Publication du rapport annuel 2024 du CNC",
    extrait: "Le rapport annuel 2024 dresse le bilan des activités du Conseil et présente les perspectives pour l'année 2025.",
    contenu: `Le Conseil National de la Concurrence publie son rapport annuel pour l'exercice 2024. Ce document retrace l'ensemble des activités menées par l'institution au cours de l'année écoulée.\n\nParmi les faits marquants : 47 enquêtes menées, 12 décisions rendues, 8 avis émis et 15 sessions de sensibilisation organisées sur l'ensemble du territoire national.`,
    date: "2025-01-30",
    categorie: "communique",
  },
  {
    slug: "decision-abus-position-dominante-ciment",
    titre: "Sanction pour abus de position dominante dans le secteur du ciment",
    extrait: "Le CNC a prononcé une amende de 800 millions FCFA contre un opérateur dominant du secteur du ciment pour abus de position dominante.",
    contenu: `Par décision en date du 10 mars 2025, le Conseil National de la Concurrence a sanctionné la société CimTchad pour abus de position dominante sur le marché du ciment.\n\nL'enquête a révélé que l'entreprise pratiquait des prix prédateurs visant à évincer ses concurrents du marché, tout en appliquant des conditions commerciales discriminatoires à l'égard de certains distributeurs.`,
    date: "2025-03-10",
    categorie: "communique",
  },
  {
    slug: "atelier-formation-enqueteurs",
    titre: "Atelier de formation des enquêteurs du CNC",
    extrait: "Un atelier de renforcement des capacités a réuni les enquêteurs du CNC pour perfectionner les techniques d'investigation en matière de concurrence.",
    contenu: `Le Conseil National de la Concurrence a organisé, du 12 au 14 février 2025, un atelier de formation destiné à ses enquêteurs. Cette formation, animée par des experts internationaux, a porté sur les techniques modernes d'investigation en matière de pratiques anticoncurrentielles.\n\nLes participants ont été formés à l'analyse économique des marchés, aux méthodes de détection des ententes et aux procédures d'enquête conformes aux standards internationaux.`,
    date: "2025-02-14",
    categorie: "evenement",
  },
  {
    slug: "enquete-secteur-bancaire",
    titre: "Le CNC examine les frais bancaires au Tchad",
    extrait: "Une étude sectorielle approfondie est lancée sur les pratiques tarifaires des établissements bancaires opérant au Tchad.",
    contenu: `Le Conseil National de la Concurrence a initié une étude sectorielle sur les pratiques tarifaires du secteur bancaire tchadien. Cette étude vise à évaluer le niveau de concurrence entre les établissements bancaires et à identifier d'éventuelles pratiques tarifaires excessives ou discriminatoires.\n\nL'étude portera sur les frais de tenue de compte, les commissions de transfert, les taux d'intérêt et les conditions d'accès au crédit.`,
    date: "2025-03-01",
    categorie: "enquete",
  },
];

// --- Documents officiels ---
export const documents: DocumentCNC[] = [
  { titre: "Loi N°014/PR/2015 relative à la concurrence en République du Tchad", categorie: "Lois & Règlements", date: "2015-06-12", taille: "1.2 Mo", type: "PDF" },
  { titre: "Décret N°2016/042 portant organisation du CNC", categorie: "Lois & Règlements", date: "2016-03-08", taille: "850 Ko", type: "PDF" },
  { titre: "Ordonnance N°2018/007 modifiant la loi sur la concurrence", categorie: "Lois & Règlements", date: "2018-11-20", taille: "980 Ko", type: "PDF" },
  { titre: "Décision CNC/DEC/2024/001 — Entente télécom", categorie: "Communiqués", date: "2024-03-15", taille: "2.1 Mo", type: "PDF" },
  { titre: "Décision CNC/DEC/2024/002 — Abus de position ciment", categorie: "Communiqués", date: "2024-04-22", taille: "1.8 Mo", type: "PDF" },
  { titre: "Avis CNC/AVI/2024/003 — Distribution pétrolière", categorie: "Avis", date: "2024-05-10", taille: "1.5 Mo", type: "PDF" },
  { titre: "Avis CNC/AVI/2024/006 — Transport aérien", categorie: "Avis", date: "2024-08-20", taille: "1.3 Mo", type: "PDF" },
  { titre: "Rapport annuel 2023 du CNC", categorie: "Rapports annuels", date: "2024-02-15", taille: "5.4 Mo", type: "PDF" },
  { titre: "Rapport annuel 2024 du CNC", categorie: "Rapports annuels", date: "2025-01-30", taille: "6.2 Mo", type: "PDF" },
  { titre: "Étude sectorielle — Marché des télécommunications au Tchad", categorie: "Études économiques", date: "2024-07-15", taille: "3.8 Mo", type: "PDF" },
  { titre: "Étude sectorielle — Concurrence dans le secteur bancaire", categorie: "Études économiques", date: "2025-03-01", taille: "4.1 Mo", type: "PDF" },
  { titre: "Guide pratique : Comment déposer une plainte auprès du CNC", categorie: "Guides pratiques", date: "2024-01-10", taille: "720 Ko", type: "PDF" },
  { titre: "Guide des bonnes pratiques concurrentielles pour les entreprises", categorie: "Guides pratiques", date: "2024-06-01", taille: "1.1 Mo", type: "PDF" },
  { titre: "Formulaire de saisine du CNC", categorie: "Formulaires", date: "2024-01-01", taille: "350 Ko", type: "PDF" },
  { titre: "Formulaire de demande d'avis", categorie: "Formulaires", date: "2024-01-01", taille: "280 Ko", type: "PDF" },
];

// --- FAQ ---
export const faqData: FAQ[] = [
  { question: "Qu'est-ce que le Conseil National de la Concurrence ?", reponse: "Le Conseil National de la Concurrence (CNC) est une autorité administrative indépendante créée par la loi N°014/PR/2015. Il est chargé de veiller au respect des règles de la concurrence sur le marché tchadien, de sanctionner les pratiques anticoncurrentielles et de promouvoir une culture de concurrence loyale.", theme: "Généralités" },
  { question: "Quelles sont les pratiques anticoncurrentielles sanctionnées par le CNC ?", reponse: "Le CNC sanctionne principalement les ententes illicites (accords entre concurrents pour fixer les prix ou se répartir les marchés), les abus de position dominante (utilisation abusive d'une position forte sur un marché) et les pratiques commerciales déloyales.", theme: "Généralités" },
  { question: "Comment déposer une plainte auprès du CNC ?", reponse: "Vous pouvez déposer une plainte directement en ligne via notre formulaire de dépôt de plainte, par courrier à notre siège à N'Djamena, ou en vous présentant physiquement dans nos locaux aux heures d'ouverture (07h30 - 15h30). La plainte doit être accompagnée de tout document justificatif pertinent.", theme: "Plaintes" },
  { question: "La plainte est-elle confidentielle ?", reponse: "Oui, le CNC garantit la confidentialité des plaintes reçues. L'identité du plaignant n'est communiquée à la partie mise en cause que si le plaignant y consent expressément. Un mécanisme de signalement anonyme est également disponible.", theme: "Plaintes" },
  { question: "Quels sont les délais de traitement d'une plainte ?", reponse: "Le CNC accuse réception de votre plainte dans un délai de 15 jours ouvrables. L'instruction du dossier peut prendre de 3 à 12 mois selon la complexité de l'affaire. Vous serez informé régulièrement de l'avancement de votre dossier.", theme: "Procédures" },
  { question: "Quelles sanctions le CNC peut-il prononcer ?", reponse: "Le CNC peut prononcer des amendes pouvant atteindre 10% du chiffre d'affaires de l'entreprise sanctionnée, ordonner la cessation des pratiques anticoncurrentielles, imposer des mesures correctives et publier ses décisions.", theme: "Sanctions" },
  { question: "Peut-on faire appel d'une décision du CNC ?", reponse: "Oui, les décisions du CNC peuvent faire l'objet d'un recours devant la Cour d'Appel de N'Djamena dans un délai de 30 jours à compter de la notification de la décision.", theme: "Procédures" },
  { question: "Le CNC peut-il intervenir de sa propre initiative ?", reponse: "Oui, le CNC peut se saisir d'office de toute pratique susceptible de porter atteinte à la concurrence. Il dispose de pouvoirs d'enquête étendus lui permettant de mener des investigations et de recueillir des preuves.", theme: "Sanctions" },
];

// --- Membres du Conseil ---
export const membres: Membre[] = [
  { nom: "M. Vissia Baranga", fonction: "Président du Conseil", initiales: "VB", couleur: "bg-primary" },
  { nom: "Mme Amina Oumar Djibrine", fonction: "Vice-Présidente", initiales: "AO", couleur: "bg-secondary" },
  { nom: "M. Ahmat Abakar Moussa", fonction: "Conseiller — Affaires juridiques", initiales: "AA", couleur: "bg-primary" },
  { nom: "Mme Fatimé Hassan Abakar", fonction: "Conseillère — Études économiques", initiales: "FH", couleur: "bg-secondary" },
  { nom: "M. Djibril Ousmane Mahamat", fonction: "Conseiller — Enquêtes", initiales: "DO", couleur: "bg-primary" },
  { nom: "M. Youssouf Ali Brahim", fonction: "Conseiller — Coopération", initiales: "YA", couleur: "bg-secondary" },
];

// --- Galerie ---
export const galerieItems: GalerieItem[] = [
  { id: 1, titre: "Réunion plénière du Conseil", description: "Session plénière ordinaire du Conseil National de la Concurrence", date: "2025-01-20", categorie: "Réunions du Conseil", gradient: "from-primary to-gold" },
  { id: 2, titre: "Session de sensibilisation — secteur commerce", description: "Atelier de sensibilisation des commerçants de N'Djamena", date: "2025-02-05", categorie: "Sessions de sensibilisation", gradient: "from-[#0284C7] to-[#38BDF8]" },
  { id: 3, titre: "Cérémonie de partenariat institutionnel", description: "Signature de convention avec la CEMAC", date: "2025-03-01", categorie: "Partenariats", gradient: "from-primary to-gold/70" },
  { id: 4, titre: "Atelier formation des enquêteurs", description: "Formation aux techniques d'investigation", date: "2025-02-14", categorie: "Sessions de sensibilisation", gradient: "from-[#0284C7] to-[#38BDF8]" },
  { id: 5, titre: "Forum régional CEMAC 2024", description: "Participation au forum sur la concurrence en zone CEMAC", date: "2024-11-15", categorie: "Événements", gradient: "from-gold to-primary" },
  { id: 6, titre: "Rencontre avec les opérateurs économiques", description: "Dialogue avec les acteurs du secteur privé", date: "2025-01-10", categorie: "Partenariats", gradient: "from-primary to-gold/70" },
  { id: 7, titre: "Assemblée générale du CNC 2024", description: "Bilan annuel et perspectives", date: "2024-12-20", categorie: "Réunions du Conseil", gradient: "from-primary to-gold" },
  { id: 8, titre: "Investigation terrain — marché central", description: "Enquête de terrain sur les pratiques commerciales", date: "2025-02-20", categorie: "Enquêtes & Investigations", gradient: "from-[#374151] to-[#6B7280]" },
  { id: 9, titre: "Visite du Ministre du Commerce", description: "Accueil du Ministre du Commerce au siège du CNC", date: "2025-01-25", categorie: "Événements", gradient: "from-gold to-primary" },
  { id: 10, titre: "Audience avec les associations de consommateurs", description: "Échange avec les représentants des consommateurs", date: "2025-03-05", categorie: "Partenariats", gradient: "from-primary to-gold/70" },
  { id: 11, titre: "Session extraordinaire du Conseil", description: "Réunion extraordinaire sur le secteur pétrolier", date: "2025-02-10", categorie: "Réunions du Conseil", gradient: "from-primary to-gold" },
  { id: 12, titre: "Enquête sectorielle — pharmacies", description: "Investigation dans le secteur pharmaceutique", date: "2024-10-15", categorie: "Enquêtes & Investigations", gradient: "from-[#374151] to-[#6B7280]" },
  { id: 13, titre: "Conférence de presse — bilan 2024", description: "Présentation des résultats annuels à la presse", date: "2025-01-30", categorie: "Événements", gradient: "from-gold to-primary" },
  { id: 14, titre: "Campagne de sensibilisation province", description: "Tournée de sensibilisation dans les provinces", date: "2025-03-12", categorie: "Sessions de sensibilisation", gradient: "from-[#0284C7] to-[#38BDF8]" },
  { id: 15, titre: "Rencontre CNC — Banque Centrale", description: "Coopération sur la régulation du secteur bancaire", date: "2025-02-28", categorie: "Partenariats", gradient: "from-primary to-gold/70" },
  { id: 16, titre: "Inspection marché Moundou", description: "Contrôle des pratiques commerciales à Moundou", date: "2025-01-18", categorie: "Enquêtes & Investigations", gradient: "from-[#374151] to-[#6B7280]" },
  { id: 17, titre: "Journée portes ouvertes CNC", description: "Accueil du public au siège du CNC", date: "2024-09-20", categorie: "Événements", gradient: "from-gold to-primary" },
  { id: 18, titre: "Formation continue des agents", description: "Programme de renforcement des capacités", date: "2025-03-18", categorie: "Sessions de sensibilisation", gradient: "from-[#0284C7] to-[#38BDF8]" },
  { id: 19, titre: "Délibération du Conseil — secteur BTP", description: "Examen des dossiers du secteur BTP", date: "2025-02-25", categorie: "Réunions du Conseil", gradient: "from-primary to-gold" },
  { id: 20, titre: "Enquête concurrence — transport routier", description: "Investigation sur les tarifs de transport", date: "2025-03-08", categorie: "Enquêtes & Investigations", gradient: "from-[#374151] to-[#6B7280]" },
];
