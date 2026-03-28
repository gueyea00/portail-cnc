-- ============================================================
-- CNC Tchad -- Schema PostgreSQL complet
-- Base de données : cncbd
-- ============================================================

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
-- TABLE : articles (actualités)
-- ============================================================
CREATE TABLE IF NOT EXISTS articles (
  id              SERIAL PRIMARY KEY,
  slug            TEXT UNIQUE NOT NULL,
  titre           TEXT NOT NULL,
  extrait         TEXT,
  contenu         TEXT,
  categorie       TEXT CHECK (categorie IN ('communique','enquete','evenement')),
  image_url       TEXT,
  image_path      TEXT,
  statut          TEXT DEFAULT 'brouillon' CHECK (statut IN ('publie','brouillon','archive')),
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
-- TABLE : documents officiels
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
-- TABLE : galerie
-- ============================================================
CREATE TABLE IF NOT EXISTS galerie_items (
  id              SERIAL PRIMARY KEY,
  titre           TEXT NOT NULL,
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
-- TABLE : membres du Conseil
-- ============================================================
CREATE TABLE IF NOT EXISTS membres (
  id              SERIAL PRIMARY KEY,
  nom             TEXT NOT NULL,
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
  statut          TEXT DEFAULT 'recue' CHECK (statut IN ('recue','en_cours','traitee','classee')),
  note_interne    TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE : services
-- ============================================================
CREATE TABLE IF NOT EXISTS services (
  id              SERIAL PRIMARY KEY,
  titre           TEXT NOT NULL,
  description     TEXT,
  icone           TEXT,
  lien            TEXT,
  ordre           INT DEFAULT 0,
  actif           BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE : parametres_site (Mot du Président, config)
-- ============================================================
CREATE TABLE IF NOT EXISTS parametres_site (
  cle             TEXT PRIMARY KEY,
  valeur          TEXT,
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
