export const schema = `
-- ============================================================
-- TABLE : admins
-- ============================================================
CREATE TABLE IF NOT EXISTS admins (
  id              SERIAL PRIMARY KEY,
  username        TEXT UNIQUE NOT NULL,
  email           TEXT UNIQUE,
  password_hash   TEXT NOT NULL,
  role            TEXT DEFAULT 'editeur' CHECK (role IN ('super_admin','editeur','lecteur')),
  actif           BOOLEAN DEFAULT true,
  derniere_connexion TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE : articles
-- ============================================================
CREATE TABLE IF NOT EXISTS articles (
  id              SERIAL PRIMARY KEY,
  slug            TEXT UNIQUE NOT NULL,
  titre           TEXT NOT NULL,
  extrait         TEXT,
  contenu         TEXT,
  categorie       TEXT,
  image_url       TEXT,
  image_path      TEXT,
  statut          TEXT DEFAULT 'brouillon',
  date_publication DATE DEFAULT CURRENT_DATE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE : decisions
-- ============================================================
CREATE TABLE IF NOT EXISTS decisions (
  id              SERIAL PRIMARY KEY,
  reference       TEXT UNIQUE NOT NULL,
  titre           TEXT NOT NULL,
  resume          TEXT,
  date_decision   DATE,
  secteur         TEXT,
  pdf_path        TEXT,
  publie          BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE : documents
-- ============================================================
CREATE TABLE IF NOT EXISTS documents (
  id              SERIAL PRIMARY KEY,
  titre           TEXT NOT NULL,
  categorie       TEXT,
  fichier_path    TEXT,
  taille          TEXT,
  type_fichier    TEXT DEFAULT 'PDF',
  date_publication DATE DEFAULT CURRENT_DATE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE : galerie_items
-- ============================================================
CREATE TABLE IF NOT EXISTS galerie_items (
  id              SERIAL PRIMARY KEY,
  titre           TEXT UNIQUE NOT NULL,
  description     TEXT,
  date_evenement  DATE,
  categorie       TEXT,
  image_path      TEXT,
  gradient        TEXT DEFAULT 'from-primary to-gold',
  ordre           INT DEFAULT 0,
  publie          BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE : membres
-- ============================================================
CREATE TABLE IF NOT EXISTS membres (
  id              SERIAL PRIMARY KEY,
  nom             TEXT UNIQUE NOT NULL,
  fonction        TEXT,
  bio             TEXT,
  photo_path      TEXT,
  initiales       TEXT,
  ordre           INT DEFAULT 0,
  actif           BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE : plaintes
-- ============================================================
CREATE TABLE IF NOT EXISTS plaintes (
  id              SERIAL PRIMARY KEY,
  reference       TEXT UNIQUE NOT NULL,
  nom             TEXT,
  prenom          TEXT,
  email           TEXT,
  telephone       TEXT,
  qualite         TEXT,
  type_pratique   TEXT,
  description     TEXT,
  entreprise_concernee TEXT,
  adresse         TEXT,
  secteur         TEXT,
  statut          TEXT DEFAULT 'recue',
  note_interne    TEXT,
  fichiers        TEXT, -- JSON array of file paths
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE : services
-- ============================================================
CREATE TABLE IF NOT EXISTS services (
  id              SERIAL PRIMARY KEY,
  titre           TEXT UNIQUE NOT NULL,
  description     TEXT,
  icone           TEXT,
  lien            TEXT,
  ordre           INT DEFAULT 0,
  actif           BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE : missions
-- ============================================================
CREATE TABLE IF NOT EXISTS missions (
  id              SERIAL PRIMARY KEY,
  titre           TEXT UNIQUE NOT NULL,
  description     TEXT,
  icone           TEXT,
  ordre           INT DEFAULT 0,
  actif           BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE : historique
-- ============================================================
CREATE TABLE IF NOT EXISTS historique (
  id              SERIAL PRIMARY KEY,
  annee           TEXT NOT NULL,
  description     TEXT NOT NULL,
  ordre           INT DEFAULT 0,
  actif           BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(annee, description)
);

-- ============================================================
-- TABLE : faq
-- ============================================================
CREATE TABLE IF NOT EXISTS faq (
  id              SERIAL PRIMARY KEY,
  question        TEXT UNIQUE NOT NULL,
  reponse         TEXT,
  theme           TEXT,
  ordre           INT DEFAULT 0,
  actif           BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE : parametres_site
-- ============================================================
CREATE TABLE IF NOT EXISTS parametres_site (
  cle             TEXT PRIMARY KEY,
  valeur          TEXT,
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE : etapes_intervention
-- ============================================================
CREATE TABLE IF NOT EXISTS etapes_intervention (
  id              SERIAL PRIMARY KEY,
  ordre           INTEGER DEFAULT 0,
  titre           TEXT UNIQUE NOT NULL,
  description     TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE : liens_institutionnels
-- ============================================================
CREATE TABLE IF NOT EXISTS liens_institutionnels (
  id              SERIAL PRIMARY KEY,
  nom             TEXT NOT NULL,
  url             TEXT NOT NULL,
  description     TEXT,
  categorie       TEXT DEFAULT 'Autre',
  ordre           INT DEFAULT 0,
  logo_path       TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
-- ============================================================
-- INDEX UNIQUES (Sécurité pour le seeding)
-- ============================================================
CREATE UNIQUE INDEX IF NOT EXISTS idx_services_titre ON services(titre);
CREATE UNIQUE INDEX IF NOT EXISTS idx_missions_titre ON missions(titre);
CREATE UNIQUE INDEX IF NOT EXISTS idx_membres_nom ON membres(nom);
CREATE UNIQUE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE UNIQUE INDEX IF NOT EXISTS idx_galerie_titre ON galerie_items(titre);
CREATE UNIQUE INDEX IF NOT EXISTS idx_faq_question ON faq(question);
CREATE UNIQUE INDEX IF NOT EXISTS idx_etapes_titre ON etapes_intervention(titre);
`;
