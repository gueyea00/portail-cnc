import React from 'react';

export default function ReglementationPage() {
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold mb-6">Réglementation et Textes de loi</h1>
      <div className="prose max-w-none">
        <p className="text-lg font-semibold text-primary">L'ensemble des dispositions est prévu par la loi.</p>
        <p>Le Conseil National de la Concurrence (CNC) est une autorité administrative indépendante instituée par la loi N°014/PR/2015.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Réglementation de la Concurrence</h2>
        <p>Le cadre juridique garantit une saine concurrence sur le marché tchadien.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Dépôt de plainte et dispositions</h2>
        <p>Conformément au règlement intérieur, tout usager peut déposer une plainte. Les frais exigibles et les pièces justificatives sont détaillés dans les textes applicables.</p>
      </div>
    </div>
  );
}
