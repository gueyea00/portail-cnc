import pool from './db.js';
import bcrypt from 'bcryptjs';

export async function seedDatabase(client) {
  const db = client || pool;

  console.log('🌱 Insertion des données initiales à jour via JavaScript...');

  // 1. Admin
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);
  
  await db.query(`
    INSERT INTO admins (username, email, password_hash, role)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash;
  `, ['admin', 'admin@cnc-tchad.td', hashedAdminPassword, 'super_admin']);

  // 2. Parametres (MAJ selon remarques client)
  const initialParams = {
    'hero_title': 'Conseil National de la Concurrence (CNC)',
    'hero_subtitle': 'Loi N°014/PR/2015',
    'hero_slogan': 'Le garant de la saine concurrence et de la protection des consommateurs.',
    'origine_organe': 'Le CNC est une autorité administrative indépendante essentielle, issue de la volonté de moderniser l\'économie tchadienne.',
    'president_nom': 'M. Vissia Baranga',
    'president_titre': 'Président du Conseil',
    'presentation_p1': 'Le CNC est l\'organe central de régulation économique au Tchad, veillant au respect des règles de concurrence sur le marché national.',
    'presentation_p2': 'Le CNC intervient pour prévenir, détecter et sanctionner les pratiques anticoncurrentielles telles que les ententes illicites, les abus de position dominante et les pratiques restrictives de concurrence.',
    'presentation_p3': 'Créé dans le cadre des réformes visant à moderniser l\'économie tchadienne, le CNC s\'est progressivement imposé comme un acteur clé dans la régulation économique.',
    'composition_cnc': 'Le Conseil National de la Concurrence compte un total de 16 membres, soit 1 Président et 15 conseillers nommés. Note : Le CNC ne dispose pas encore d\'expert attitré en interne.',
    'footer_telephone': '+235 22 52 12 34',
    'footer_email': 'contact@cnc-tchad.td',
    'footer_adresse': 'Avenue Charles de Gaulle, N\'Djamena, Tchad',
    'horaires_ouverture': '07h30 – 15h30',
  };
  for (const [cle, valeur] of Object.entries(initialParams)) {
    await db.query(`INSERT INTO parametres_site (cle, valeur) VALUES ($1, $2) ON CONFLICT (cle) DO UPDATE SET valeur = EXCLUDED.valeur;`, [cle, valeur]);
  }

  // 3. Missions (MAJ selon remarques client)
  const missions = [
    ["Contrôle des pratiques anticoncurrentielles", "Identifier et sanctionner les ententes illicites entre entreprises, les abus de position dominante et les pratiques commerciales déloyales qui nuisent à l'économie.", "Shield", 1],
    ["Régulation des concentrations", "Examiner les projets de fusions, d'acquisitions et de regroupements d'entreprises pour prévenir la création de monopoles nuisibles à la concurrence. Cette mission est cruciale pour maintenir un marché ouvert.", "GitMerge", 2],
    ["Lutte contre la concurrence déloyale", "Combattre les pratiques abusives telles que le dénigrement, la désorganisation ou la confusion visant à détourner la clientèle d'un concurrent.", "Scale", 3],
    ["Avis consultatifs", "Émettre des avis experts et objectifs sur les projets de textes législatifs ou réglementaires ayant un impact sur la concurrence, afin d'orienter le Gouvernement.", "FileText", 4],
    ["Études de marché", "Réaliser des analyses approfondies sur le fonctionnement de secteurs spécifiques de l'économie pour identifier d'éventuels dysfonctionnements concurrentiels.", "BarChart3", 5],
    ["Sensibilisation et promotion", "Informer les opérateurs économiques et les consommateurs sur les règles de la concurrence et promouvoir une culture de loyauté commerciale au Tchad.", "Users", 6],
    ["Protection des consommateurs", "Veiller à ce que les consommateurs bénéficient d'un choix diversifié de produits et services à des prix compétitifs, en assurant un marché dynamique et ouvert.", "CheckCircle", 7],
    ["Enquêtes et investigations", "Mener des enquêtes d'office ou sur saisine pour constater les infractions aux règles de la concurrence et recueillir les preuves nécessaires aux procédures.", "Search", 8]
  ];
  for (const m of missions) {
    await db.query(`INSERT INTO missions (titre, description, icone, ordre) VALUES ($1, $2, $3, $4) ON CONFLICT (titre) DO UPDATE SET description = EXCLUDED.description;`, m);
  }

  console.log('✅ Base de données initialisée avec succès avec les données client !');
}
