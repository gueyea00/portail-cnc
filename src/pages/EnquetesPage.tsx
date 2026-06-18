import React from 'react';

export default function EnquetesPage() {
  return (
    <div className="container-page py-12 space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-4">Processus et Procédures d'Enquêtes</h1>
        <p className="text-muted-foreground">Description claire des modalités d'ouvertures d'enquêtes par le Conseil National de la Concurrence.</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-surface border rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-primary mb-2">Enquête Simple</h2>
          <p className="text-sm">Destinée aux vérifications de routine et examens préliminaires de conformité sur le marché national.</p>
        </div>
        <div className="p-6 bg-surface border rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-primary mb-2">Enquête Approfondie</h2>
          <p className="text-sm">Déclenchée en cas de soupçons sérieux de pratiques anticoncurrentielles majeures nécessitant des investigations poussées.</p>
        </div>
      </section>

      <section className="bg-muted p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-3">Secteurs Concernés & Prioritaires</h2>
        <p className="mb-4">Bien que le dispositif couvre l'ensemble des domaines d'activités économiques du Tchad, des enquêtes prioritaires ciblent en permanence les secteurs clés suivants :</p>
        <ul className="list-disc pl-6 space-y-2 text-sm">
          <li><strong>Transport :</strong> Régulation des flux de fret et des passagers.</li>
          <li><strong>Énergie :</strong> Surveillance de la distribution et de l'accès aux ressources énergétiques.</li>
          <li><strong>Eau :</strong> Contrôle de l'accès équitable aux ressources hydriques.</li>
          <li><strong>Télécoms / Numérique :</strong> Surveillance des opérateurs et tarifs numériques.</li>
        </ul>
        <p className="mt-4 text-xs text-muted-foreground italic">* Note : Les secteurs des hydrocarbures font l'objet d'un suivi spécifique réglementé distinctement.</p>
      </section>

      <section className="border-t pt-6">
        <h2 className="text-xl font-bold mb-3">Contrôle Économique</h2>
        <p className="text-sm mb-4">Les enquêtes et contrôles sont assistés sur le terrain par des agents de contrôle dûment désignés. À l'issue de chaque contrôle, une fiche de contrôle économique est émise en <strong>4 exemplaires</strong> originaux.</p>
        <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-sm">
          <strong>Circuit réglementaire des infractions :</strong> En cas de constatation d'une infraction avérée, le dossier du délinquant économique est immédiatement transmis au <strong>tribunal compétent</strong> pour traitement judiciaire.
        </div>
      </section>
    </div>
  );
}
