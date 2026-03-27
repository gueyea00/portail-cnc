// ============================================================
// DonnÃ©es mock rÃ©alistes pour le portail CNC Tchad
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
    description: "Identifier et sanctionner les ententes illicites, abus de position dominante et pratiques anticoncurrentielles qui nuisent Ã  l'Ã©conomie tchadienne et aux consommateurs.",
    icone: "Shield",
  },
  {
    titre: "Régulation des concentrations économiques",
    description: "Examiner et contrÃ´ler les opÃ©rations de fusion, acquisition et concentration d'entreprises susceptibles de porter atteinte Ã  la concurrence sur le marchÃ© national.",
    icone: "GitMerge",
  },
  {
    titre: "Lutte contre les pratiques commerciales déloyales",
    description: "Combattre les actes de concurrence dÃ©loyale, la publicitÃ© trompeuse et les pratiques commerciales abusives affectant les opÃ©rateurs Ã©conomiques.",
    icone: "Scale",
  },
  {
    titre: "Avis sur les textes législatifs et réglementaires",
    description: "Ã‰mettre des avis consultatifs sur les projets de lois, ordonnances et rÃ¨glements ayant un impact sur la concurrence et le fonctionnement des marchÃ©s.",
    icone: "FileText",
  },
  {
    titre: "Études sectorielles et veille concurrentielle",
    description: "RÃ©aliser des Ã©tudes approfondies sur le fonctionnement des marchÃ©s et des secteurs Ã©conomiques stratÃ©giques pour le dÃ©veloppement du Tchad.",
    icone: "BarChart3",
  },
  {
    titre: "Sensibilisation et promotion de la culture de concurrence",
    description: "Organiser des campagnes de sensibilisation auprÃ¨s des opÃ©rateurs Ã©conomiques, des consommateurs et des institutions sur les bienfaits de la concurrence loyale.",
    icone: "Users",
  },
  {
    titre: "Coopération internationale et régionale",
    description: "Collaborer avec les institutions sous-rÃ©gionales (CEMAC, UA) et internationales en matiÃ¨re de droit et de politique de la concurrence.",
    icone: "Globe",
  },
  {
    titre: "Protection des consommateurs",
    description: "Veiller Ã  ce que les pratiques commerciales respectent les droits des consommateurs et garantissent l'accÃ¨s Ã  des produits et services de qualitÃ© Ã  des prix justes.",
    icone: "Heart",
  },
  {
    titre: "Enquêtes et investigations",
    description: "Mener des enquÃªtes d'office ou sur saisine pour constater les infractions aux rÃ¨gles de la concurrence et recueillir les preuves nÃ©cessaires aux procÃ©dures.",
    icone: "Search",
  },
];

// --- Articles d'actualitÃ© ---
export const articles: Article[] = [
  {
    slug: "decision-entente-secteur-telecoms",
    titre: "Le CNC sanctionne une entente dans le secteur des tÃ©lÃ©communications",
    extrait: "Le Conseil National de la Concurrence a rendu une dÃ©cision historique sanctionnant trois opÃ©rateurs de tÃ©lÃ©communications pour entente illicite sur les tarifs.",
    contenu: `Le Conseil National de la Concurrence a rendu, le 15 janvier 2025, une dÃ©cision majeure dans le secteur des tÃ©lÃ©communications au Tchad. Trois opÃ©rateurs ont Ã©tÃ© reconnus coupables d'une entente illicite visant Ã  fixer de maniÃ¨re concertÃ©e les tarifs de communication mobile.\n\nCette pratique, qui perdurait depuis 2022, a eu pour effet de priver les consommateurs tchadiens du bÃ©nÃ©fice de la concurrence par les prix. Les amendes prononcÃ©es s'Ã©lÃ¨vent Ã  un total de 2,5 milliards de francs CFA.\n\nLe PrÃ©sident du CNC a soulignÃ© que Â« cette dÃ©cision marque la dÃ©termination du Conseil Ã  faire respecter les rÃ¨gles de la concurrence dans tous les secteurs de l'Ã©conomie nationale Â».`,
    date: "2025-01-15",
    categorie: "communique",
  },
  {
    slug: "enquete-secteur-hydrocarbures",
    titre: "Ouverture d'une enquÃªte dans le secteur des hydrocarbures",
    extrait: "Le CNC ouvre une enquÃªte approfondie sur les pratiques tarifaires dans le secteur de la distribution des produits pÃ©troliers au Tchad.",
    contenu: `Le Conseil National de la Concurrence a dÃ©cidÃ© d'ouvrir une enquÃªte sectorielle sur les pratiques observÃ©es dans la distribution des produits pÃ©troliers sur l'ensemble du territoire national.\n\nCette enquÃªte fait suite Ã  de nombreux signalements de consommateurs et d'associations dÃ©nonÃ§ant des Ã©carts de prix significatifs entre les stations-service, notamment dans les zones rurales.\n\nLes enquÃªteurs du CNC procÃ©deront Ã  des auditions et Ã  des vÃ©rifications sur piÃ¨ces et sur place auprÃ¨s de l'ensemble des acteurs de la chaÃ®ne de distribution.`,
    date: "2025-02-03",
    categorie: "enquete",
  },
  {
    slug: "forum-cemac-concurrence-2025",
    titre: "Le CNC participe au Forum rÃ©gional CEMAC sur la concurrence",
    extrait: "La dÃ©lÃ©gation tchadienne a participÃ© activement au 5e Forum rÃ©gional sur la politique de concurrence dans l'espace CEMAC.",
    contenu: `Du 20 au 22 mars 2025, le Conseil National de la Concurrence du Tchad a participÃ© au 5e Forum rÃ©gional sur la politique de concurrence organisÃ© par la CEMAC Ã  Douala, Cameroun.\n\nLa dÃ©lÃ©gation tchadienne, conduite par le PrÃ©sident du CNC, a prÃ©sentÃ© les avancÃ©es du Tchad en matiÃ¨re de rÃ©gulation de la concurrence et a partagÃ© son expÃ©rience sur la mise en place d'un cadre juridique adaptÃ© aux rÃ©alitÃ©s Ã©conomiques de la sous-rÃ©gion.`,
    date: "2025-03-22",
    categorie: "evenement",
  },
  {
    slug: "communique-sensibilisation-n-djamena",
    titre: "Campagne de sensibilisation Ã  N'Djamena",
    extrait: "Le CNC lance une vaste campagne de sensibilisation auprÃ¨s des commerÃ§ants et opÃ©rateurs Ã©conomiques de N'Djamena sur les pratiques anticoncurrentielles.",
    contenu: `Le Conseil National de la Concurrence a lancÃ©, le 5 fÃ©vrier 2025, une campagne de sensibilisation d'envergure Ã  N'Djamena. Cette initiative vise Ã  informer les opÃ©rateurs Ã©conomiques sur les rÃ¨gles de la concurrence et les sanctions encourues en cas de violation.\n\nDes ateliers interactifs ont Ã©tÃ© organisÃ©s dans les principaux marchÃ©s de la capitale, rÃ©unissant plus de 500 participants.`,
    date: "2025-02-05",
    categorie: "communique",
  },
  {
    slug: "rapport-annuel-2024",
    titre: "Publication du rapport annuel 2024 du CNC",
    extrait: "Le rapport annuel 2024 dresse le bilan des activitÃ©s du Conseil et prÃ©sente les perspectives pour l'annÃ©e 2025.",
    contenu: `Le Conseil National de la Concurrence publie son rapport annuel pour l'exercice 2024. Ce document retrace l'ensemble des activitÃ©s menÃ©es par l'institution au cours de l'annÃ©e Ã©coulÃ©e.\n\nParmi les faits marquants : 47 enquÃªtes menÃ©es, 12 dÃ©cisions rendues, 8 avis Ã©mis et 15 sessions de sensibilisation organisÃ©es sur l'ensemble du territoire national.`,
    date: "2025-01-30",
    categorie: "communique",
  },
  {
    slug: "decision-abus-position-dominante-ciment",
    titre: "Sanction pour abus de position dominante dans le secteur du ciment",
    extrait: "Le CNC a prononcÃ© une amende de 800 millions FCFA contre un opÃ©rateur dominant du secteur du ciment pour abus de position dominante.",
    contenu: `Par dÃ©cision en date du 10 mars 2025, le Conseil National de la Concurrence a sanctionnÃ© la sociÃ©tÃ© CimTchad pour abus de position dominante sur le marchÃ© du ciment.\n\nL'enquÃªte a rÃ©vÃ©lÃ© que l'entreprise pratiquait des prix prÃ©dateurs visant Ã  Ã©vincer ses concurrents du marchÃ©, tout en appliquant des conditions commerciales discriminatoires Ã  l'Ã©gard de certains distributeurs.`,
    date: "2025-03-10",
    categorie: "communique",
  },
  {
    slug: "atelier-formation-enqueteurs",
    titre: "Atelier de formation des enquÃªteurs du CNC",
    extrait: "Un atelier de renforcement des capacitÃ©s a rÃ©uni les enquÃªteurs du CNC pour perfectionner les techniques d'investigation en matiÃ¨re de concurrence.",
    contenu: `Le Conseil National de la Concurrence a organisÃ©, du 12 au 14 fÃ©vrier 2025, un atelier de formation destinÃ© Ã  ses enquÃªteurs. Cette formation, animÃ©e par des experts internationaux, a portÃ© sur les techniques modernes d'investigation en matiÃ¨re de pratiques anticoncurrentielles.\n\nLes participants ont Ã©tÃ© formÃ©s Ã  l'analyse Ã©conomique des marchÃ©s, aux mÃ©thodes de dÃ©tection des ententes et aux procÃ©dures d'enquÃªte conformes aux standards internationaux.`,
    date: "2025-02-14",
    categorie: "evenement",
  },
  {
    slug: "enquete-secteur-bancaire",
    titre: "Le CNC examine les frais bancaires au Tchad",
    extrait: "Une Ã©tude sectorielle approfondie est lancÃ©e sur les pratiques tarifaires des Ã©tablissements bancaires opÃ©rant au Tchad.",
    contenu: `Le Conseil National de la Concurrence a initiÃ© une Ã©tude sectorielle sur les pratiques tarifaires du secteur bancaire tchadien. Cette Ã©tude vise Ã  Ã©valuer le niveau de concurrence entre les Ã©tablissements bancaires et Ã  identifier d'Ã©ventuelles pratiques tarifaires excessives ou discriminatoires.\n\nL'Ã©tude portera sur les frais de tenue de compte, les commissions de transfert, les taux d'intÃ©rÃªt et les conditions d'accÃ¨s au crÃ©dit.`,
    date: "2025-03-01",
    categorie: "enquete",
  },
];

// --- DÃ©cisions supprimÃ©es ---

// --- Documents officiels ---
export const documents: DocumentCNC[] = [
  { titre: "Loi NÂ°014/PR/2015 relative Ã  la concurrence en RÃ©publique du Tchad", categorie: "Lois & RÃ¨glements", date: "2015-06-12", taille: "1.2 Mo", type: "PDF" },
  { titre: "DÃ©cret NÂ°2016/042 portant organisation du CNC", categorie: "Lois & RÃ¨glements", date: "2016-03-08", taille: "850 Ko", type: "PDF" },
  { titre: "Ordonnance NÂ°2018/007 modifiant la loi sur la concurrence", categorie: "Lois & RÃ¨glements", date: "2018-11-20", taille: "980 Ko", type: "PDF" },
  { titre: "DÃ©cision CNC/DEC/2024/001 â€” Entente tÃ©lÃ©com", categorie: "CommuniquÃ©s", date: "2024-03-15", taille: "2.1 Mo", type: "PDF" },
  { titre: "DÃ©cision CNC/DEC/2024/002 â€” Abus de position ciment", categorie: "CommuniquÃ©s", date: "2024-04-22", taille: "1.8 Mo", type: "PDF" },
  { titre: "Avis CNC/AVI/2024/003 â€” Distribution pÃ©troliÃ¨re", categorie: "Avis", date: "2024-05-10", taille: "1.5 Mo", type: "PDF" },
  { titre: "Avis CNC/AVI/2024/006 â€” Transport aÃ©rien", categorie: "Avis", date: "2024-08-20", taille: "1.3 Mo", type: "PDF" },
  { titre: "Rapport annuel 2023 du CNC", categorie: "Rapports annuels", date: "2024-02-15", taille: "5.4 Mo", type: "PDF" },
  { titre: "Rapport annuel 2024 du CNC", categorie: "Rapports annuels", date: "2025-01-30", taille: "6.2 Mo", type: "PDF" },
  { titre: "Ã‰tude sectorielle â€” MarchÃ© des tÃ©lÃ©communications au Tchad", categorie: "Ã‰tudes Ã©conomiques", date: "2024-07-15", taille: "3.8 Mo", type: "PDF" },
  { titre: "Ã‰tude sectorielle â€” Concurrence dans le secteur bancaire", categorie: "Ã‰tudes Ã©conomiques", date: "2025-03-01", taille: "4.1 Mo", type: "PDF" },
  { titre: "Guide pratique : Comment dÃ©poser une plainte auprÃ¨s du CNC", categorie: "Guides pratiques", date: "2024-01-10", taille: "720 Ko", type: "PDF" },
  { titre: "Guide des bonnes pratiques concurrentielles pour les entreprises", categorie: "Guides pratiques", date: "2024-06-01", taille: "1.1 Mo", type: "PDF" },
  { titre: "Formulaire de saisine du CNC", categorie: "Formulaires", date: "2024-01-01", taille: "350 Ko", type: "PDF" },
  { titre: "Formulaire de demande d'avis", categorie: "Formulaires", date: "2024-01-01", taille: "280 Ko", type: "PDF" },
];

// --- FAQ ---
export const faqData: FAQ[] = [
  { question: "Qu'est-ce que le Conseil National de la Concurrence ?", reponse: "Le Conseil National de la Concurrence (CNC) est une autoritÃ© administrative indÃ©pendante crÃ©Ã©e par la loi NÂ°014/PR/2015. Il est chargÃ© de veiller au respect des rÃ¨gles de la concurrence sur le marchÃ© tchadien, de sanctionner les pratiques anticoncurrentielles et de promouvoir une culture de concurrence loyale.", theme: "GÃ©nÃ©ralitÃ©s" },
  { question: "Quelles sont les pratiques anticoncurrentielles sanctionnÃ©es par le CNC ?", reponse: "Le CNC sanctionne principalement les ententes illicites (accords entre concurrents pour fixer les prix ou se rÃ©partir les marchÃ©s), les abus de position dominante (utilisation abusive d'une position forte sur un marchÃ©) et les pratiques commerciales dÃ©loyales.", theme: "GÃ©nÃ©ralitÃ©s" },
  { question: "Comment dÃ©poser une plainte auprÃ¨s du CNC ?", reponse: "Vous pouvez dÃ©poser une plainte directement en ligne via notre formulaire de dÃ©pÃ´t de plainte, par courrier Ã  notre siÃ¨ge Ã  N'Djamena, ou en vous prÃ©sentant physiquement dans nos locaux aux heures d'ouverture (07h30 - 15h30). La plainte doit Ãªtre accompagnÃ©e de tout document justificatif pertinent.", theme: "Plaintes" },
  { question: "La plainte est-elle confidentielle ?", reponse: "Oui, le CNC garantit la confidentialitÃ© des plaintes reÃ§ues. L'identitÃ© du plaignant n'est communiquÃ©e Ã  la partie mise en cause que si le plaignant y consent expressÃ©ment. Un mÃ©canisme de signalement anonyme est Ã©galement disponible.", theme: "Plaintes" },
  { question: "Quels sont les dÃ©lais de traitement d'une plainte ?", reponse: "Le CNC accuse rÃ©ception de votre plainte dans un dÃ©lai de 15 jours ouvrables. L'instruction du dossier peut prendre de 3 Ã  12 mois selon la complexitÃ© de l'affaire. Vous serez informÃ© rÃ©guliÃ¨rement de l'avancement de votre dossier.", theme: "ProcÃ©dures" },
  { question: "Quelles sanctions le CNC peut-il prononcer ?", reponse: "Le CNC peut prononcer des amendes pouvant atteindre 10% du chiffre d'affaires de l'entreprise sanctionnÃ©e, ordonner la cessation des pratiques anticoncurrentielles, imposer des mesures correctives et publier ses dÃ©cisions.", theme: "Sanctions" },
  { question: "Peut-on faire appel d'une dÃ©cision du CNC ?", reponse: "Oui, les dÃ©cisions du CNC peuvent faire l'objet d'un recours devant la Cour d'Appel de N'Djamena dans un dÃ©lai de 30 jours Ã  compter de la notification de la dÃ©cision.", theme: "ProcÃ©dures" },
  { question: "Le CNC peut-il intervenir de sa propre initiative ?", reponse: "Oui, le CNC peut se saisir d'office de toute pratique susceptible de porter atteinte Ã  la concurrence. Il dispose de pouvoirs d'enquÃªte Ã©tendus lui permettant de mener des investigations et de recueillir des preuves.", theme: "Sanctions" },
];

// --- Membres du Conseil ---
export const membres: Membre[] = [
  { nom: "M. Vissia Baranga", fonction: "Président du Conseil", initiales: "VB", couleur: "bg-primary" },
  { nom: "Mme Amina Oumar Djibrine", fonction: "Vice-PrÃ©sidente", initiales: "AO", couleur: "bg-secondary" },
  { nom: "M. Ahmat Abakar Moussa", fonction: "Conseiller â€” Affaires juridiques", initiales: "AA", couleur: "bg-primary" },
  { nom: "Mme FatimÃ© Hassan Abakar", fonction: "ConseillÃ¨re â€” Ã‰tudes Ã©conomiques", initiales: "FH", couleur: "bg-secondary" },
  { nom: "M. Djibril Ousmane Mahamat", fonction: "Conseiller â€” EnquÃªtes", initiales: "DO", couleur: "bg-primary" },
  { nom: "M. Youssouf Ali Brahim", fonction: "Conseiller â€” CoopÃ©ration", initiales: "YA", couleur: "bg-secondary" },
];

// --- Galerie ---
export const galerieItems: GalerieItem[] = [
  { id: 1, titre: "RÃ©union plÃ©niÃ¨re du Conseil", description: "Session plÃ©niÃ¨re ordinaire du Conseil National de la Concurrence", date: "2025-01-20", categorie: "RÃ©unions du Conseil", gradient: "from-primary to-gold" },
  { id: 2, titre: "Session de sensibilisation â€” secteur commerce", description: "Atelier de sensibilisation des commerÃ§ants de N'Djamena", date: "2025-02-05", categorie: "Sessions de sensibilisation", gradient: "from-[#0284C7] to-[#38BDF8]" },
  { id: 3, titre: "CÃ©rÃ©monie de partenariat institutionnel", description: "Signature de convention avec la CEMAC", date: "2025-03-01", categorie: "Partenariats", gradient: "from-primary to-gold/70" },
  { id: 4, titre: "Atelier formation des enquÃªteurs", description: "Formation aux techniques d'investigation", date: "2025-02-14", categorie: "Sessions de sensibilisation", gradient: "from-[#0284C7] to-[#38BDF8]" },
  { id: 5, titre: "Forum rÃ©gional CEMAC 2024", description: "Participation au forum sur la concurrence en zone CEMAC", date: "2024-11-15", categorie: "Ã‰vÃ©nements", gradient: "from-gold to-primary" },
  { id: 6, titre: "Rencontre avec les opÃ©rateurs Ã©conomiques", description: "Dialogue avec les acteurs du secteur privÃ©", date: "2025-01-10", categorie: "Partenariats", gradient: "from-primary to-gold/70" },
  { id: 7, titre: "AssemblÃ©e gÃ©nÃ©rale du CNC 2024", description: "Bilan annuel et perspectives", date: "2024-12-20", categorie: "RÃ©unions du Conseil", gradient: "from-primary to-gold" },
  { id: 8, titre: "Investigation terrain â€” marchÃ© central", description: "EnquÃªte de terrain sur les pratiques commerciales", date: "2025-02-20", categorie: "EnquÃªtes & Investigations", gradient: "from-[#374151] to-[#6B7280]" },
  { id: 9, titre: "Visite du Ministre du Commerce", description: "Accueil du Ministre du Commerce au siÃ¨ge du CNC", date: "2025-01-25", categorie: "Ã‰vÃ©nements", gradient: "from-gold to-primary" },
  { id: 10, titre: "Audience avec les associations de consommateurs", description: "Ã‰change avec les reprÃ©sentants des consommateurs", date: "2025-03-05", categorie: "Partenariats", gradient: "from-primary to-gold/70" },
  { id: 11, titre: "Session extraordinaire du Conseil", description: "RÃ©union extraordinaire sur le secteur pÃ©trolier", date: "2025-02-10", categorie: "RÃ©unions du Conseil", gradient: "from-primary to-gold" },
  { id: 12, titre: "EnquÃªte sectorielle â€” pharmacies", description: "Investigation dans le secteur pharmaceutique", date: "2024-10-15", categorie: "EnquÃªtes & Investigations", gradient: "from-[#374151] to-[#6B7280]" },
  { id: 13, titre: "ConfÃ©rence de presse â€” bilan 2024", description: "PrÃ©sentation des rÃ©sultats annuels Ã  la presse", date: "2025-01-30", categorie: "Ã‰vÃ©nements", gradient: "from-gold to-primary" },
  { id: 14, titre: "Campagne de sensibilisation province", description: "TournÃ©e de sensibilisation dans les provinces", date: "2025-03-12", categorie: "Sessions de sensibilisation", gradient: "from-[#0284C7] to-[#38BDF8]" },
  { id: 15, titre: "Rencontre CNC â€” Banque Centrale", description: "CoopÃ©ration sur la rÃ©gulation du secteur bancaire", date: "2025-02-28", categorie: "Partenariats", gradient: "from-primary to-gold/70" },
  { id: 16, titre: "Inspection marchÃ© Moundou", description: "ContrÃ´le des pratiques commerciales Ã  Moundou", date: "2025-01-18", categorie: "EnquÃªtes & Investigations", gradient: "from-[#374151] to-[#6B7280]" },
  { id: 17, titre: "JournÃ©e portes ouvertes CNC", description: "Accueil du public au siÃ¨ge du CNC", date: "2024-09-20", categorie: "Ã‰vÃ©nements", gradient: "from-gold to-primary" },
  { id: 18, titre: "Formation continue des agents", description: "Programme de renforcement des capacitÃ©s", date: "2025-03-18", categorie: "Sessions de sensibilisation", gradient: "from-[#0284C7] to-[#38BDF8]" },
  { id: 19, titre: "DÃ©libÃ©ration du Conseil â€” secteur BTP", description: "Examen des dossiers du secteur BTP", date: "2025-02-25", categorie: "RÃ©unions du Conseil", gradient: "from-primary to-gold" },
  { id: 20, titre: "EnquÃªte concurrence â€” transport routier", description: "Investigation sur les tarifs de transport", date: "2025-03-08", categorie: "EnquÃªtes & Investigations", gradient: "from-[#374151] to-[#6B7280]" },
];

// --- CatÃ©gories de documents ---
export const categoriesDocuments = [
  "Lois & RÃ¨glements",
  "Avis",
  "Rapports annuels",
  "Ã‰tudes Ã©conomiques",
  "Guides pratiques",
  "Formulaires",
];

// --- Services ---
export const services = [
  { titre: "DÃ©pÃ´t de plainte", description: "Soumettez une plainte formelle concernant des pratiques anticoncurrentielles. Votre plainte sera examinÃ©e par nos services compÃ©tents dans les meilleurs dÃ©lais.", icone: "FileWarning", lien: "/plainte" },
  { titre: "Signalement anonyme", description: "Signalez une pratique suspecte de maniÃ¨re anonyme. Votre identitÃ© sera protÃ©gÃ©e tout au long de la procÃ©dure.", icone: "ShieldAlert", lien: "/signalement" },
  { titre: "Suivi de dossier", description: "Consultez l'Ã©tat d'avancement de votre dossier en cours de traitement grÃ¢ce Ã  votre numÃ©ro de rÃ©fÃ©rence.", icone: "ClipboardList", lien: "#" },
  { titre: "Demande d'avis", description: "Sollicitez l'avis du CNC sur une question de concurrence ou sur un projet d'opÃ©ration de concentration.", icone: "MessageSquare", lien: "#" },
  { titre: "Prise de rendez-vous", description: "Planifiez un rendez-vous avec les services du CNC pour toute question relative Ã  la concurrence.", icone: "Calendar", lien: "#" },
];

// --- Directions / Organigramme ---
export const directions = [
  { titre: "Direction des EnquÃªtes et Investigations", description: "ChargÃ©e de mener les enquÃªtes sur les pratiques anticoncurrentielles, de recueillir les preuves et d'instruire les dossiers soumis au Conseil." },
  { titre: "Direction des Ã‰tudes Ã‰conomiques", description: "Responsable des Ã©tudes de marchÃ©, des analyses sectorielles et de la veille concurrentielle sur l'ensemble de l'Ã©conomie tchadienne." },
  { titre: "Direction Juridique et du Contentieux", description: "Assure le conseil juridique du Conseil, rÃ©dige les dÃ©cisions et avis, et gÃ¨re les procÃ©dures contentieuses." },
  { titre: "Direction de la CoopÃ©ration et de la Communication", description: "GÃ¨re les relations avec les partenaires institutionnels nationaux et internationaux et les campagnes de sensibilisation." },
  { titre: "Direction Administrative et FinanciÃ¨re", description: "Assure la gestion administrative, financiÃ¨re et des ressources humaines de l'institution." },
];

// --- CatÃ©gories de la galerie ---
export const categoriesGalerie = [
  "Tous",
  "RÃ©unions du Conseil",
  "EnquÃªtes & Investigations",
  "Sessions de sensibilisation",
  "Partenariats",
  "Ã‰vÃ©nements",
];

// --- Stats homepage ---
export const stats = [
  { valeur: "47", label: "EnquÃªtes menÃ©es" },
  { valeur: "8", label: "Secteurs surveillÃ©s" },
  { valeur: "15", label: "Sessions de sensibilisation" },
];
