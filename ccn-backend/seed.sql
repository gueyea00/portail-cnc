-- ============================================================
-- CNC Tchad -- Seed PostgreSQL
-- Données initiales : admin + contenu de départ
-- ============================================================

-- Admin par défaut : admin / admin123
-- (hash bcrypt de "admin123")
INSERT INTO admins (username, email, password_hash, role)
VALUES (
  'admin',
  'admin@cnc-tchad.td',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'super_admin'
) ON CONFLICT (username) DO NOTHING;

-- ============================================================
-- Paramètres site (Mot du Président)
-- ============================================================
INSERT INTO parametres_site (cle, valeur) VALUES
  ('president_nom',     'M. Vissia Baranga'),
  ('president_titre',   'Président du Conseil National de la Concurrence'),
  ('president_message', 'Le Conseil National de la Concurrence œuvre chaque jour pour garantir un marché équitable, ouvert et dynamique au Tchad. Notre mission est de protéger les entreprises contre les pratiques déloyales et de défendre les intérêts des consommateurs. À travers ce portail, nous mettons à votre disposition un outil moderne d''information, de transparence et d''accès à nos services.'),
  ('president_photo',   '')
ON CONFLICT (cle) DO NOTHING;

-- ============================================================
-- Services initiaux
-- ============================================================
INSERT INTO services (titre, description, icone, lien, ordre) VALUES
  ('Dépôt de plainte',     'Soumettez une plainte formelle concernant des pratiques anticoncurrentielles.', 'FileWarning', '/plainte', 1),
  ('Signalement anonyme',  'Signalez une pratique suspecte de manière anonyme.', 'ShieldAlert', '/signalement', 2),
  ('Suivi de dossier',     'Consultez l''état d''avancement de votre dossier.', 'ClipboardList', '#', 3),
  ('Demande d''avis',      'Sollicitez l''avis du CNC sur une question de concurrence.', 'MessageSquare', '#', 4),
  ('Prise de rendez-vous', 'Planifiez un rendez-vous avec les services du CNC.', 'Calendar', '#', 5)
ON CONFLICT DO NOTHING;

-- ============================================================
-- Membres du Conseil
-- ============================================================
INSERT INTO membres (nom, fonction, initiales, ordre) VALUES
  ('M. Vissia Baranga',      'Président du Conseil',                'VB', 1),
  ('Mme Amina Oumar Djibrine', 'Vice-Présidente',                   'AO', 2),
  ('M. Ahmat Abakar Moussa', 'Conseiller — Affaires juridiques',    'AA', 3),
  ('Mme Fatimé Hassan Abakar', 'Conseillère — Études économiques',  'FH', 4),
  ('M. Djibril Ousmane Mahamat', 'Conseiller — Enquêtes',          'DO', 5),
  ('M. Youssouf Ali Brahim', 'Conseiller — Coopération',           'YA', 6)
ON CONFLICT DO NOTHING;

-- ============================================================
-- Articles initiaux
-- ============================================================
INSERT INTO articles (slug, titre, extrait, contenu, categorie, statut, date_publication) VALUES
  (
    'decision-entente-secteur-telecoms',
    'Le CNC sanctionne une entente dans le secteur des télécommunications',
    'Le Conseil National de la Concurrence a rendu une décision historique sanctionnant trois opérateurs de télécommunications pour entente illicite sur les tarifs.',
    'Le Conseil National de la Concurrence a rendu, le 15 janvier 2025, une décision majeure dans le secteur des télécommunications au Tchad.',
    'communique', 'publie', '2025-01-15'
  ),
  (
    'enquete-secteur-hydrocarbures',
    'Ouverture d''une enquête dans le secteur des hydrocarbures',
    'Le CNC ouvre une enquête approfondie sur les pratiques tarifaires dans le secteur de la distribution des produits pétroliers.',
    'Le Conseil National de la Concurrence a décidé d''ouvrir une enquête sectorielle sur les pratiques observées dans la distribution des produits pétroliers.',
    'enquete', 'publie', '2025-02-03'
  ),
  (
    'forum-cemac-concurrence-2025',
    'Le CNC participe au Forum régional CEMAC sur la concurrence',
    'La délégation tchadienne a participé activement au 5e Forum régional sur la politique de concurrence dans l''espace CEMAC.',
    'Du 20 au 22 mars 2025, le Conseil National de la Concurrence du Tchad a participé au 5e Forum régional sur la politique de concurrence organisé par la CEMAC à Douala.',
    'evenement', 'publie', '2025-03-22'
  )
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Galerie initiale
-- ============================================================
INSERT INTO galerie_items (titre, description, date_evenement, categorie, gradient, ordre) VALUES
  ('Réunion plénière du Conseil', 'Session plénière ordinaire du CNC', '2025-01-20', 'Réunions du Conseil', 'from-primary to-gold', 1),
  ('Session de sensibilisation — secteur commerce', 'Atelier de sensibilisation des commerçants de N''Djamena', '2025-02-05', 'Sessions de sensibilisation', 'from-[#0284C7] to-[#38BDF8]', 2),
  ('Forum régional CEMAC 2024', 'Participation au forum sur la concurrence en zone CEMAC', '2024-11-15', 'Événements', 'from-gold to-primary', 3)
ON CONFLICT DO NOTHING;
