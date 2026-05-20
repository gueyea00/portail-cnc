--
-- PostgreSQL database dump
--

\restrict VlvCtKEP4toEtS3W2hgVZtXlFw26YdN9Rr17iTp7bMjKIewAKVKq8geXQlLuKdf

-- Dumped from database version 15.17
-- Dumped by pg_dump version 15.17

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    id integer NOT NULL,
    username text NOT NULL,
    email text,
    password_hash text NOT NULL,
    role text DEFAULT 'editeur'::text,
    actif boolean DEFAULT true,
    derniere_connexion timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT admins_role_check CHECK ((role = ANY (ARRAY['super_admin'::text, 'editeur'::text, 'lecteur'::text])))
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- Name: admins_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admins_id_seq OWNER TO postgres;

--
-- Name: admins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;


--
-- Name: articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.articles (
    id integer NOT NULL,
    slug text NOT NULL,
    titre text NOT NULL,
    extrait text,
    contenu text,
    categorie text,
    image_url text,
    image_path text,
    statut text DEFAULT 'brouillon'::text,
    date_publication date DEFAULT CURRENT_DATE,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.articles OWNER TO postgres;

--
-- Name: articles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.articles_id_seq OWNER TO postgres;

--
-- Name: articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;


--
-- Name: decisions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.decisions (
    id integer NOT NULL,
    reference text NOT NULL,
    titre text NOT NULL,
    resume text,
    date_decision date,
    secteur text,
    pdf_path text,
    publie boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.decisions OWNER TO postgres;

--
-- Name: decisions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.decisions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.decisions_id_seq OWNER TO postgres;

--
-- Name: decisions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.decisions_id_seq OWNED BY public.decisions.id;


--
-- Name: documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.documents (
    id integer NOT NULL,
    titre text NOT NULL,
    categorie text,
    fichier_path text,
    taille text,
    type_fichier text DEFAULT 'PDF'::text,
    date_publication date DEFAULT CURRENT_DATE,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.documents OWNER TO postgres;

--
-- Name: documents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.documents_id_seq OWNER TO postgres;

--
-- Name: documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.documents_id_seq OWNED BY public.documents.id;


--
-- Name: etapes_intervention; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.etapes_intervention (
    id integer NOT NULL,
    ordre integer DEFAULT 0,
    titre text NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.etapes_intervention OWNER TO postgres;

--
-- Name: etapes_intervention_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.etapes_intervention_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.etapes_intervention_id_seq OWNER TO postgres;

--
-- Name: etapes_intervention_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.etapes_intervention_id_seq OWNED BY public.etapes_intervention.id;


--
-- Name: faq; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faq (
    id integer NOT NULL,
    question text NOT NULL,
    reponse text,
    theme text,
    ordre integer DEFAULT 0,
    actif boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.faq OWNER TO postgres;

--
-- Name: faq_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.faq_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.faq_id_seq OWNER TO postgres;

--
-- Name: faq_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.faq_id_seq OWNED BY public.faq.id;


--
-- Name: galerie_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.galerie_items (
    id integer NOT NULL,
    titre text NOT NULL,
    description text,
    date_evenement date,
    categorie text,
    image_path text,
    gradient text DEFAULT 'from-primary to-gold'::text,
    ordre integer DEFAULT 0,
    publie boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.galerie_items OWNER TO postgres;

--
-- Name: galerie_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.galerie_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galerie_items_id_seq OWNER TO postgres;

--
-- Name: galerie_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.galerie_items_id_seq OWNED BY public.galerie_items.id;


--
-- Name: historique; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historique (
    id integer NOT NULL,
    annee text NOT NULL,
    description text NOT NULL,
    ordre integer DEFAULT 0,
    actif boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.historique OWNER TO postgres;

--
-- Name: historique_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.historique_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.historique_id_seq OWNER TO postgres;

--
-- Name: historique_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.historique_id_seq OWNED BY public.historique.id;


--
-- Name: liens_institutionnels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.liens_institutionnels (
    id integer NOT NULL,
    nom text NOT NULL,
    url text NOT NULL,
    description text,
    categorie text DEFAULT 'Autre'::text,
    ordre integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    logo_path text
);


ALTER TABLE public.liens_institutionnels OWNER TO postgres;

--
-- Name: liens_institutionnels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.liens_institutionnels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.liens_institutionnels_id_seq OWNER TO postgres;

--
-- Name: liens_institutionnels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.liens_institutionnels_id_seq OWNED BY public.liens_institutionnels.id;


--
-- Name: membres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.membres (
    id integer NOT NULL,
    nom text NOT NULL,
    fonction text,
    bio text,
    photo_path text,
    initiales text,
    ordre integer DEFAULT 0,
    actif boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.membres OWNER TO postgres;

--
-- Name: membres_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.membres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.membres_id_seq OWNER TO postgres;

--
-- Name: membres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.membres_id_seq OWNED BY public.membres.id;


--
-- Name: missions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.missions (
    id integer NOT NULL,
    titre text NOT NULL,
    description text,
    icone text,
    ordre integer DEFAULT 0,
    actif boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.missions OWNER TO postgres;

--
-- Name: missions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.missions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.missions_id_seq OWNER TO postgres;

--
-- Name: missions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.missions_id_seq OWNED BY public.missions.id;


--
-- Name: parametres_site; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parametres_site (
    cle text NOT NULL,
    valeur text,
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.parametres_site OWNER TO postgres;

--
-- Name: plaintes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plaintes (
    id integer NOT NULL,
    reference text NOT NULL,
    nom text,
    prenom text,
    email text,
    telephone text,
    qualite text,
    type_pratique text,
    description text,
    entreprise_concernee text,
    adresse text,
    secteur text,
    statut text DEFAULT 'recue'::text,
    note_interne text,
    fichiers text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.plaintes OWNER TO postgres;

--
-- Name: plaintes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plaintes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.plaintes_id_seq OWNER TO postgres;

--
-- Name: plaintes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plaintes_id_seq OWNED BY public.plaintes.id;


--
-- Name: services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.services (
    id integer NOT NULL,
    titre text NOT NULL,
    description text,
    icone text,
    lien text,
    ordre integer DEFAULT 0,
    actif boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.services OWNER TO postgres;

--
-- Name: services_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.services_id_seq OWNER TO postgres;

--
-- Name: services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;


--
-- Name: admins id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);


--
-- Name: articles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);


--
-- Name: decisions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.decisions ALTER COLUMN id SET DEFAULT nextval('public.decisions_id_seq'::regclass);


--
-- Name: documents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents ALTER COLUMN id SET DEFAULT nextval('public.documents_id_seq'::regclass);


--
-- Name: etapes_intervention id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etapes_intervention ALTER COLUMN id SET DEFAULT nextval('public.etapes_intervention_id_seq'::regclass);


--
-- Name: faq id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faq ALTER COLUMN id SET DEFAULT nextval('public.faq_id_seq'::regclass);


--
-- Name: galerie_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galerie_items ALTER COLUMN id SET DEFAULT nextval('public.galerie_items_id_seq'::regclass);


--
-- Name: historique id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historique ALTER COLUMN id SET DEFAULT nextval('public.historique_id_seq'::regclass);


--
-- Name: liens_institutionnels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.liens_institutionnels ALTER COLUMN id SET DEFAULT nextval('public.liens_institutionnels_id_seq'::regclass);


--
-- Name: membres id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membres ALTER COLUMN id SET DEFAULT nextval('public.membres_id_seq'::regclass);


--
-- Name: missions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missions ALTER COLUMN id SET DEFAULT nextval('public.missions_id_seq'::regclass);


--
-- Name: plaintes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plaintes ALTER COLUMN id SET DEFAULT nextval('public.plaintes_id_seq'::regclass);


--
-- Name: services id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (id, username, email, password_hash, role, actif, derniere_connexion, created_at) FROM stdin;
1	admin	admin@cnc-tchad.td	$2a$10$BEE/.RSIZSXGSX.RR7brbOr2HVccH6rgRMqkJyyb0nPN7rKZCrdWe	super_admin	t	2026-05-19 14:54:41.565069+00	2026-04-29 15:59:36.109489+00
\.


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.articles (id, slug, titre, extrait, contenu, categorie, image_url, image_path, statut, date_publication, created_at, updated_at) FROM stdin;
3	forum-cemac-concurrence-2025	Le CNC participe au Forum régional CEMAC sur la concurrence	La délégation tchadienne a participé activement au 5e Forum régional sur la politique de concurrence dans l'espace CEMAC.	Du 20 au 22 mars 2025, le Conseil National de la Concurrence du Tchad a participé au 5e Forum régional sur la politique de concurrence organisé par la CEMAC à Douala.	evenement		uploads/articles/article-1779182928594.jpg	publie	2025-03-22	2026-04-29 15:59:36.367038+00	2026-05-19 09:28:49.32+00
2	enquete-secteur-hydrocarbures	Ouverture d'une enquête dans le secteur des hydrocarbures	Le CNC ouvre une enquête approfondie sur les pratiques tarifaires dans le secteur de la distribution des produits pétroliers.	Le Conseil National de la Concurrence a décidé d'ouvrir une enquête sectorielle sur les pratiques observées dans la distribution des produits pétroliers.	enquete		uploads/articles/article-1779182946243.jpg	publie	2025-02-03	2026-04-29 15:59:36.361508+00	2026-05-19 09:29:06.981+00
1	decision-entente-secteur-telecoms	Le CNC sanctionne une entente dans le secteur des télécommunications	Le Conseil National de la Concurrence a rendu une décision historique sanctionnant trois opérateurs de télécommunications pour entente illicite sur les tarifs.	Le Conseil National de la Concurrence a rendu, le 15 janvier 2025, une décision majeure dans le secteur des télécommunications au Tchad.	communique		uploads/articles/article-1779182959055.jpg	publie	2025-01-15	2026-04-29 15:59:36.345839+00	2026-05-19 09:29:19.787+00
\.


--
-- Data for Name: decisions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.decisions (id, reference, titre, resume, date_decision, secteur, pdf_path, publie, created_at) FROM stdin;
\.


--
-- Data for Name: documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.documents (id, titre, categorie, fichier_path, taille, type_fichier, date_publication, created_at) FROM stdin;
\.


--
-- Data for Name: etapes_intervention; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.etapes_intervention (id, ordre, titre, description, created_at) FROM stdin;
1	1	Saisine	Plainte, signalement ou auto-saisine.	2026-04-29 15:59:36.529215+00
3	3	Instruction	Débat contradictoire des parties.	2026-04-29 15:59:36.548794+00
4	4	Délibération	Conseil en séance plénière.	2026-04-29 15:59:36.561002+00
5	5	Décision	Notification et publication officielle.	2026-04-29 15:59:36.568504+00
2	2	Enquêtes	Enquêtes simples et approfondies faite par les agents assermentés du ministère	2026-04-29 15:59:36.540149+00
82	2	Enquête	Collecte de preuves et auditions.	2026-05-19 22:13:53.460822+00
\.


--
-- Data for Name: faq; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faq (id, question, reponse, theme, ordre, actif, created_at) FROM stdin;
1	Qu'est-ce que le Conseil National de la Concurrence ?	Le Conseil National de la Concurrence (CNC) est une autorité administrative indépendante créée par la loi N°014/PR/2015. Il est chargé de veiller au respect des règles de la concurrence sur le marché tchadien, de sanctionner les pratiques anticoncurrentielles et de promouvoir une culture de concurrence loyale.	Généralités	1	t	2026-04-29 15:59:36.506607+00
2	Quelles sont les pratiques anticoncurrentielles sanctionnées par le CNC ?	Le CNC sanctionne principalement les ententes illicites (accords entre concurrents pour fixer les prix ou se répartir les marchés), les abus de position dominante (utilisation abusive d'une position forte sur un marché) et les pratiques commerciales déloyales.	Généralités	2	t	2026-04-29 15:59:36.515315+00
3	Comment déposer une plainte auprès du CNC ?	Vous pouvez déposer une plainte directement en ligne via notre formulaire de dépôt de plainte, par courrier à notre siège à N'Djamena, ou en vous présentant physiquement dans nos locaux aux heures d'ouverture (07h30 - 15h30).	Plaintes	3	t	2026-04-29 15:59:36.521914+00
\.


--
-- Data for Name: galerie_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.galerie_items (id, titre, description, date_evenement, categorie, image_path, gradient, ordre, publie, created_at) FROM stdin;
1	Réunion plénière du Conseil	Session plénière ordinaire du CNC	2025-01-20	Réunions du Conseil	uploads/galerie/photo-1779183448763.jpg	from-primary to-gold	1	t	2026-04-29 15:59:36.371633+00
2	Session de sensibilisation — secteur commerce	Atelier de sensibilisation des commerçants de N'Djamena	2025-02-05	Sessions de sensibilisation	uploads/galerie/photo-1779183462187.jpg	from-[#0284C7] to-[#38BDF8]	2	t	2026-04-29 15:59:36.378999+00
3	Forum régional CEMAC 2024	Participation au forum sur la concurrence en zone CEMAC	2024-11-15	Événements	uploads/galerie/photo-1779183476058.jpg	from-gold to-primary	3	t	2026-04-29 15:59:36.384335+00
\.


--
-- Data for Name: historique; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.historique (id, annee, description, ordre, actif, created_at) FROM stdin;
61	2018	Décret 1662/PR/MMDICPSP/2018 du 16 octobre 2018 portant nomination d’un président du CNC	2	t	2026-05-11 15:03:40.31854+00
5	2021	Renforcement des capacités du président dans le cadre du Conseil Communautaire de la Concurrence de la CEMAC.	6	t	2026-04-29 15:59:36.490823+00
63	2019	Décret 0284/PR/MMDICPSP/2019 du 12 mars 2019 portant désignation des membres du CNC	3	t	2026-05-11 15:09:16.141268+00
62	2019	Lancement des enquêtes et règlement intérieur dans le secteur de manufacture des cigarettes\n	4	t	2026-05-11 15:04:20.630799+00
2	2018	Décret N° 1510/PR/MMDICPSP/2018 du 15 août 2018 portant composition et modalités de fonctionnement du CNC	1	t	2026-04-29 15:59:36.472731+00
1	2014	Loi N° 043/PR/2014 du 24 décembre 2014 relative à la Concurrence.	0	t	2026-04-29 15:59:36.460637+00
100	2019	Arrêté portant interdiction de la commercialisation du sucre importé dans la partie méridionale du pays.	5	t	2026-05-19 14:55:29.482808+00
101	2015	Loi N°014/PR/2015 relative à la concurrence.	1	t	2026-05-19 22:13:53.361526+00
102	2016	Décret N°2016/042 organisation et fonctionnement.	2	t	2026-05-19 22:13:53.371323+00
103	2017	Installation officielle du premier Conseil.	3	t	2026-05-19 22:13:53.384329+00
104	2018	Lancement des enquêtes et règlement intérieur.	4	t	2026-05-19 22:13:53.398069+00
105	2020	Renforcement des capacités (Partenaires).	5	t	2026-05-19 22:13:53.408199+00
106	2024	Bilan : 47 enquêtes, 12 décisions, 8 avis.	6	t	2026-05-19 22:13:53.420551+00
\.


--
-- Data for Name: liens_institutionnels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.liens_institutionnels (id, nom, url, description, categorie, ordre, created_at, logo_path) FROM stdin;
4	CEMAC	https://cemac.int/	\N	Partenaire	0	2026-05-19 09:13:06.340516+00	uploads/site/logo-1779181985888.png
5	état  tchadien	#	\N	Partenaire	1	2026-05-19 09:13:57.069149+00	uploads/site/logo-1779182036286.png
6	ministère du commerce et de l’industrie	#	\N	Partenaire	2	2026-05-19 09:14:29.487469+00	uploads/site/logo-1779182068874.png
\.


--
-- Data for Name: membres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.membres (id, nom, fonction, bio, photo_path, initiales, ordre, actif, created_at) FROM stdin;
71	M. MAHAMAT CHAHATA LOUKOUMI	Représentant du Secrétariat Général du Gouvernement		uploads/membres/membre-1779182522010.png		15	t	2026-05-04 08:52:06.192482+00
88	Dr. DJOUDOUNGSEOUGOU DJOUFOUNE	Représentant Ordre National des Médecins du Tchad		uploads/membres/membre-1779182533884.png		16	t	2026-05-14 19:51:29.298634+00
80	Dr. MOGODE JUDITH	Représentante de l'Ordre Notional des Pharmaciens du Tchad		uploads/membres/membre-1779182556300.png	18	18	t	2026-05-04 09:40:59.512379+00
79	M. ABAKAR YACOUB	Représentant de l'Autorité de Régulation du Secteur Pétrolier Aval du Tchad		uploads/membres/membre-1779182581158.png		19	t	2026-05-04 09:39:47.53877+00
87	M. GADEMI HISSEIN	Représentant de la Chambre de Commerce, d'Industrie, d'Agriculture, des Mines et d'Artisanat		uploads/membres/membre-1779182593431.png		20	t	2026-05-14 19:49:01.103364+00
75	Mme MOUDALBAYE RONELYAM Régina	 Représentante de l'Ordre National des Professionnels Comptables du Tchad		uploads/membres/membre-1779182603466.png		21	t	2026-05-04 08:58:54.244629+00
1	M. VISSIA BOURANGA	Président du Conseil		uploads/membres/membre-1779191906630.png	VB	0	t	2026-04-29 15:59:36.295231+00
119	M. Vissia Baranga	Président du Conseil	\N	\N	VB	1	t	2026-05-19 22:13:53.276866+00
120	Mme Amina Oumar Djibrine	Vice-Présidente	\N	\N	AO	2	t	2026-05-19 22:13:53.283022+00
121	M. Ahmat Abakar Moussa	Conseiller — Affaires juridiques	\N	\N	AA	3	t	2026-05-19 22:13:53.290804+00
122	Mme Fatimé Hassan Abakar	Conseillère — Études économiques	\N	\N	FH	4	t	2026-05-19 22:13:53.29543+00
123	M. Djibril Ousmane Mahamat	Conseiller — Enquêtes	\N	\N	DO	5	t	2026-05-19 22:13:53.299766+00
124	M. Youssouf Ali Brahim	Conseiller — Coopération	\N	\N	YA	6	t	2026-05-19 22:13:53.304257+00
77	M. ABDELKERIM ABOGOUROU SILECK	Représentant de l'Autorité de Régulation des Communications Electroniques et des Postes		uploads/membres/membre-1779182377138.png		7	t	2026-05-04 09:29:51.311818+00
76	M. DAOUDA ELHAJ ADAM	Représentant de l'Association pour la Défense des Droits des Consommateurs 		uploads/membres/membre-1779182390994.png		8	t	2026-05-04 09:13:33.683911+00
74	Mme DJAH ZARA OUEDDO	Représentante du Conseil National du Patronat Tchadien		uploads/membres/membre-1779182406976.png		9	t	2026-05-04 08:56:41.016238+00
72	M. DJABRE DADI	Représentant du Ministère en charge de l'lndustrie		uploads/membres/membre-1779182453586.png		10	t	2026-05-04 08:53:26.355638+00
73	Me KOULMEM NADJIRO	Représentante de I'Ordre des Avocats du Tchad		uploads/membres/membre-1779182464606.png		11	t	2026-05-04 08:54:19.740981+00
64	Mme TOUDJINGAR NAKIRI DENEBEYE WALENDOM GENEVIEVE	Représentante du Ministère en charge du Commerce		uploads/membres/membre-1779182476046.png		12	t	2026-04-30 16:21:44.214233+00
62	Mme DEYO JUIIENNE	Représentante du Ministère en charge de la Justice		uploads/membres/membre-1779182490804.png		13	t	2026-04-30 16:12:33.659032+00
61	M. ADELI EDJI TARSOUI	Représentant de l'Assemblée Nationale		uploads/membres/membre-1779182503459.png		14	t	2026-04-30 16:11:34.495413+00
\.


--
-- Data for Name: missions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.missions (id, titre, description, icone, ordre, actif, created_at) FROM stdin;
1	Contrôle des pratiques anticoncurrentielles	Identifier et sanctionner les ententes illicites entre entreprises, les abus de position dominante et les pratiques commerciales déloyales qui nuisent à l'économie.	Shield	1	t	2026-04-29 15:59:36.388981+00
6	Sensibilisation et promotion	Informer les opérateurs économiques et les consommateurs sur les règles de la concurrence et promouvoir une culture de loyauté commerciale au Tchad.	Users	6	t	2026-04-29 15:59:36.435622+00
7	Protection des consommateurs	Veiller à ce que les consommateurs bénéficient d'un choix diversifié de produits et services à des prix compétitifs grâce à un marché dynamique et ouvert.	CheckCircle	7	t	2026-04-29 15:59:36.443856+00
83	Lutte contre la concurrence déloyale	Combattre les pratiques abusives telles que le dénigrement, la désorganisation ou la confusion visant à détourner la clientèle d'un concurrent.	Scale	3	t	2026-05-13 11:12:06.066204+00
3	Apport d'expertise à la prise de décision de justice	Apporter l’expertise et l’assistance nécessaire à la prise des décisions de justice en matière de concurrence. 	Scale	3	t	2026-04-29 15:59:36.40552+00
4	Avis consultatifs	Émettre des avis sur les projets de lois et règlements en matière de concurrence au Tchad	FileText	4	t	2026-04-29 15:59:36.412879+00
2	Régulation des concentrations	Emission des avis sur les projets de concentrations	GitMerge	2	t	2026-04-29 15:59:36.398439+00
89	Pouvoirs d'enquêtes	Les agents assermentés et commissionnés du Conseil National de la Concurrence, dont les missions sont définies à l'Article 39 de la Loi N°043/PR/2014, conduisent des enquêtes simples et approfondies, dressent des procès-verbaux et rapports (Art. 42 à 47), et engagent les procédures de sanction pouvant aboutir à des amendes et des poursuites pénales (Titre VIII, Sections 1 et 2) à l'encontre des contrevenants.	Shield	9	t	2026-05-18 11:35:24.00141+00
5	Études de marché	Réaliser des analyses approfondies sur le fonctionnement de secteurs spécifiques de l'économie pour identifier d'éventuels dysfonctionnements concurrentiels.	BarChart3	5	t	2026-04-29 15:59:36.427559+00
97	Enquêtes et investigations	Mener des enquêtes d'office ou sur saisine pour constater les infractions aux règles de la concurrence et recueillir les preuves nécessaires aux procédures.	Search	8	t	2026-05-18 17:48:36.606104+00
\.


--
-- Data for Name: parametres_site; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parametres_site (cle, valeur, updated_at) FROM stdin;
missions_hero_subtitle		2026-05-19 10:25:36.765724+00
plainte_hero_title		2026-05-19 10:25:36.771292+00
missions_process_subtitle		2026-05-19 10:25:36.776628+00
news_hero_title		2026-05-19 10:25:36.780988+00
news_hero_subtitle		2026-05-19 10:25:36.784618+00
services_hero_title		2026-05-19 10:25:36.78885+00
services_hero_subtitle		2026-05-19 10:25:36.793219+00
footer_telephone		2026-05-19 10:25:36.799296+00
pres_section_title		2026-05-19 10:25:36.803368+00
president_photo_path	uploads/site/president_photo_file-1779186335715-455569838.png	2026-05-19 10:25:36.807647+00
faq_hero_subtitle		2026-05-19 10:25:36.811471+00
home_welcome_badge		2026-05-19 10:25:36.817633+00
home_news_subtitle		2026-05-19 10:25:36.822052+00
pres_hero_title		2026-05-19 10:25:36.82877+00
contact_hero_title		2026-05-19 10:25:36.833077+00
plainte_hero_subtitle		2026-05-19 10:25:36.879543+00
footer_quick_links_title		2026-05-19 10:25:36.890724+00
footer_services_title		2026-05-19 10:25:36.902774+00
president_nom	M. Vissia BOURANGA	2026-05-19 10:25:36.908679+00
sig_hero_title		2026-05-19 10:25:36.922014+00
pres_timeline_title		2026-05-19 10:25:36.930855+00
pres_timeline_subtitle		2026-05-19 10:25:36.947706+00
hero_title	Réguler une concurrence saine et loyale pour une économie efficiente et prospère au Tchad 	2026-05-19 10:25:36.953782+00
hero_subtitle	Créé par la Loi N°043/PR/2014 du 24 décembre 2014 relative à la Concurrence, le CNC est un organe administratif rattaché au Ministère en charge du Commerce chargé de veiller au respect des règles de la Concurrence et de promouvoir un environnement économique juste et transparent au Tchad 	2026-05-19 10:25:36.962448+00
horaires_ouverture	07h30 – 15h30	2026-05-19 10:25:36.971351+00
siege_social	Habbena, N'Djamena, Tchad	2026-05-19 10:25:36.980369+00
presentation_p1	Le Conseil National de la Concurrence (CNC) est un organe administratif rattaché au Ministère en charge du Commerce chargée de veiller au respect des règles de concurrence sur le marché national.	2026-05-19 10:25:36.988616+00
lien_facebook		2026-05-19 10:25:36.999683+00
nom_site_ligne2	de la Concurrence	2026-05-19 10:25:37.007317+00
home_missions_title		2026-05-19 10:25:37.015339+00
home_missions_subtitle		2026-05-19 10:25:37.023099+00
presentation_p2	Le CNC intervient pour prévenir, détecter et sanctionner les pratiques anticoncurrentielles telles que les ententes illicites, les abus de position dominante et les pratiques restrictives de concurrence.	2026-05-19 10:25:37.033406+00
lien_linkedin		2026-05-19 10:25:37.042305+00
lien_twitter		2026-05-19 10:25:37.057881+00
nom_site_ligne1	Portail du Conseil National	2026-05-19 10:25:37.067422+00
presentation_p3	Créé dans le cadre des réformes visant à moderniser l'économie tchadienne, le CNC s'est progressivement imposé comme un acteur clé dans la régulation des marchés, biens, produits et services.	2026-05-19 10:25:37.076665+00
missions_hero_title	Missions & Attributions	2026-05-19 10:25:36.616513+00
footer_adresse	Habbena, N'Djamena, Tchad	2026-05-19 10:25:36.636761+00
galerie_hero_title		2026-05-19 10:25:36.64825+00
galerie_hero_subtitle		2026-05-19 10:25:36.663452+00
contact_telephone		2026-05-19 10:25:37.087696+00
footer_email	contact@cnc-tchad.td	2026-05-19 10:25:36.669758+00
footer_description	Autorité administrative indépendante chargée de veiller au respect des règles de la concurrence en République du Tchad.	2026-05-19 10:25:36.679069+00
contact_email		2026-05-19 10:25:37.097555+00
docs_hero_title		2026-05-19 10:25:37.106301+00
home_services_subtitle		2026-05-19 10:25:37.11478+00
docs_hero_subtitle		2026-05-19 10:25:37.125394+00
home_services_title		2026-05-19 10:25:37.137676+00
logo_path	uploads/site/logo_file-1779186336435-119868461.png	2026-05-19 10:25:37.146907+00
missions_process_title		2026-05-19 10:25:36.68642+00
sig_hero_subtitle		2026-05-19 10:25:36.693852+00
pres_hero_subtitle		2026-05-19 10:25:36.699862+00
footer_contact_title		2026-05-19 10:25:36.711357+00
footer_newsletter_title		2026-05-19 10:25:36.720957+00
footer_copyright		2026-05-19 10:25:36.730252+00
pres_members_title		2026-05-19 10:25:36.737646+00
faq_hero_title		2026-05-19 10:25:36.752211+00
hero_bg_path	uploads/site/hero_bg_file-1779184964626-801121988.jpeg	2026-05-19 10:25:36.758516+00
missions_section_subtitle		2026-05-19 10:25:36.837324+00
contact_hero_subtitle		2026-05-19 10:25:36.841835+00
contact_adresse		2026-05-19 10:25:36.847638+00
home_news_title		2026-05-19 10:25:36.854205+00
president_titre	Président du Conseil	2026-05-19 10:25:36.859659+00
president_message	Le Conseil National de la Concurrence œuvre sans relâche pour garantir un marché équitable où chaque opérateur économique peut prospérer dans le respect des règles de la libre concurrence. Notre mission est de bâtir un environnement de confiance propice au développement économique de notre nation tchadienne.	2026-05-19 10:25:36.867837+00
\.


--
-- Data for Name: plaintes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plaintes (id, reference, nom, prenom, email, telephone, qualite, type_pratique, description, entreprise_concernee, adresse, secteur, statut, note_interne, fichiers, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.services (id, titre, description, icone, lien, ordre, actif, created_at) FROM stdin;
1	Dépôt de plainte	Soumettez une plainte formelle concernant des pratiques anticoncurrentielles.	FileWarning	/plainte	1	t	2026-04-29 15:59:36.241366+00
2	Signalement anonyme	Signalez une pratique suspecte de manière anonyme.	ShieldAlert	/signalement	2	t	2026-04-29 15:59:36.249873+00
3	Suivi de dossier	Consultez l'état d'avancement de votre dossier.	ClipboardList	/suivi-projet	3	t	2026-04-29 15:59:36.258995+00
4	Demande d'avis	Sollicitez l'avis du CNC sur une question de concurrence.	MessageSquare	#	4	t	2026-04-29 15:59:36.269105+00
5	Prise de rendez-vous	Planifiez un rendez-vous avec les services du CNC.	Calendar	#	5	t	2026-04-29 15:59:36.283605+00
\.


--
-- Name: admins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admins_id_seq', 21, true);


--
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.articles_id_seq', 63, true);


--
-- Name: decisions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.decisions_id_seq', 1, false);


--
-- Name: documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.documents_id_seq', 1, true);


--
-- Name: etapes_intervention_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.etapes_intervention_id_seq', 105, true);


--
-- Name: faq_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.faq_id_seq', 63, true);


--
-- Name: galerie_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.galerie_items_id_seq', 63, true);


--
-- Name: historique_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.historique_id_seq', 130, true);


--
-- Name: liens_institutionnels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.liens_institutionnels_id_seq', 6, true);


--
-- Name: membres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.membres_id_seq', 148, true);


--
-- Name: missions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.missions_id_seq', 169, true);


--
-- Name: plaintes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plaintes_id_seq', 1, false);


--
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.services_id_seq', 105, true);


--
-- Name: admins admins_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key UNIQUE (email);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- Name: admins admins_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key UNIQUE (username);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- Name: articles articles_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_slug_key UNIQUE (slug);


--
-- Name: decisions decisions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.decisions
    ADD CONSTRAINT decisions_pkey PRIMARY KEY (id);


--
-- Name: decisions decisions_reference_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.decisions
    ADD CONSTRAINT decisions_reference_key UNIQUE (reference);


--
-- Name: documents documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);


--
-- Name: etapes_intervention etapes_intervention_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etapes_intervention
    ADD CONSTRAINT etapes_intervention_pkey PRIMARY KEY (id);


--
-- Name: etapes_intervention etapes_intervention_titre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etapes_intervention
    ADD CONSTRAINT etapes_intervention_titre_key UNIQUE (titre);


--
-- Name: faq faq_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faq
    ADD CONSTRAINT faq_pkey PRIMARY KEY (id);


--
-- Name: faq faq_question_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faq
    ADD CONSTRAINT faq_question_key UNIQUE (question);


--
-- Name: galerie_items galerie_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galerie_items
    ADD CONSTRAINT galerie_items_pkey PRIMARY KEY (id);


--
-- Name: galerie_items galerie_items_titre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galerie_items
    ADD CONSTRAINT galerie_items_titre_key UNIQUE (titre);


--
-- Name: historique historique_annee_description_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historique
    ADD CONSTRAINT historique_annee_description_key UNIQUE (annee, description);


--
-- Name: historique historique_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historique
    ADD CONSTRAINT historique_pkey PRIMARY KEY (id);


--
-- Name: liens_institutionnels liens_institutionnels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.liens_institutionnels
    ADD CONSTRAINT liens_institutionnels_pkey PRIMARY KEY (id);


--
-- Name: membres membres_nom_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membres
    ADD CONSTRAINT membres_nom_key UNIQUE (nom);


--
-- Name: membres membres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membres
    ADD CONSTRAINT membres_pkey PRIMARY KEY (id);


--
-- Name: missions missions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missions
    ADD CONSTRAINT missions_pkey PRIMARY KEY (id);


--
-- Name: missions missions_titre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missions
    ADD CONSTRAINT missions_titre_key UNIQUE (titre);


--
-- Name: parametres_site parametres_site_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parametres_site
    ADD CONSTRAINT parametres_site_pkey PRIMARY KEY (cle);


--
-- Name: plaintes plaintes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plaintes
    ADD CONSTRAINT plaintes_pkey PRIMARY KEY (id);


--
-- Name: plaintes plaintes_reference_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plaintes
    ADD CONSTRAINT plaintes_reference_key UNIQUE (reference);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- Name: services services_titre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_titre_key UNIQUE (titre);


--
-- Name: idx_articles_slug; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX idx_articles_slug ON public.articles USING btree (slug);


--
-- Name: idx_etapes_titre; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX idx_etapes_titre ON public.etapes_intervention USING btree (titre);


--
-- Name: idx_faq_question; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX idx_faq_question ON public.faq USING btree (question);


--
-- Name: idx_galerie_titre; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX idx_galerie_titre ON public.galerie_items USING btree (titre);


--
-- Name: idx_membres_nom; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX idx_membres_nom ON public.membres USING btree (nom);


--
-- Name: idx_missions_titre; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX idx_missions_titre ON public.missions USING btree (titre);


--
-- Name: idx_services_titre; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX idx_services_titre ON public.services USING btree (titre);


--
-- PostgreSQL database dump complete
--

\unrestrict VlvCtKEP4toEtS3W2hgVZtXlFw26YdN9Rr17iTp7bMjKIewAKVKq8geXQlLuKdf

