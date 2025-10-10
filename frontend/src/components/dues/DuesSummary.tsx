
import React from 'react';
import { LuWallet, LuClock, LuCheck, LuX } from 'react-icons/lu';

const DuesSummary = () => {
  // Mock data for interesting insights
  const totalExpected = 500000; // XAF
  const totalCollected = 350000; // XAF
  const outstandingDues = totalExpected - totalCollected;
  const membersWithOutstanding = 15; // Example
  const upcomingDuesCount = 5; // Example

  const summaryCards = [
    {
      id: 1,
      title: "Total Attendu",
      value: `${totalExpected.toLocaleString()} XAF`,
      icon: <LuWallet className="text-primary text-3xl" />,
      description: "Montant total des cotisations prévues.",
      colorClass: "bg-primary/10 text-primary",
    },
    {
      id: 2,
      title: "Collecté ce mois-ci",
      value: `${totalCollected.toLocaleString()} XAF`,
      icon: <LuCheck className="text-success text-3xl" />,
      description: "Montant déjà perçu pour la période actuelle.",
      colorClass: "bg-success/10 text-success",
    },
    {
      id: 3,
      title: "Cotisations en Retard",
      value: `${outstandingDues.toLocaleString()} XAF`,
      icon: <LuX className="text-error text-3xl" />,
      description: `Dû par ${membersWithOutstanding} membres.`, // More interesting info
      colorClass: "bg-error/10 text-error",
    },
    {
      id: 4,
      title: "Prochaines Échéances",
      value: `${upcomingDuesCount} cotisations`,
      icon: <LuClock className="text-info text-3xl" />,
      description: "À venir dans les 30 prochains jours.",
      colorClass: "bg-info/10 text-info",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {summaryCards.map((card) => (
        <div key={card.id} className="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          <div className="card-body">
            <div className="flex items-center justify-between mb-2">
              <h2 className="card-title text-lg font-semibold text-base-content">{card.title}</h2>
              <div className={`p-2 rounded-full ${card.colorClass}`}>
                {card.icon}
              </div>
            </div>
            <p className="text-3xl font-bold text-base-content mb-1">{card.value}</p>
            <p className="text-sm text-gray-500">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DuesSummary;
