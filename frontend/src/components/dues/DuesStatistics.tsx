import React from "react";
import { LuTrendingUp, LuTrendingDown, LuUsers, LuClock } from "react-icons/lu";

const DuesStatistics = () => {
  // Mock data for interesting statistics
  const paidPercentage = 70; // % of total expected dues collected
  const overduePercentage = 15; // % of total expected dues overdue
  const pendingPercentage = 15; // % of total expected dues pending
  const newMembersThisMonth = 5; // Example
  const averageDueAmount = 12500; // XAF

  return (
    <div className="p-6 bg-base-100 shadow-xl rounded-box mb-6">
      <h2 className="text-2xl font-serif font-bold mb-4 text-base-content">
        Aperçu des Statistiques
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stat place-items-center">
          <div className="stat-figure text-success">
            <LuTrendingUp className="text-3xl" />
          </div>
          <div className="stat-title font-bold text-base-content text-center">
            Cotisations Payées
          </div>
          <div className="stat-value text-success text-center">
            {paidPercentage}%
          </div>
          <div className="stat-desc text-wrap text-center">
            +{newMembersThisMonth} nouveaux membres ce mois-ci
          </div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-figure text-error">
            <LuTrendingDown className="text-3xl" />
          </div>
          <div className="stat-title font-bold text-base-content text-center">
            Cotisations en Retard
          </div>
          <div className="stat-value text-error text-center">
            {overduePercentage}%
          </div>
          <div className="stat-desc text-wrap text-center">
            Agir rapidement pour recouvrer
          </div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-figure text-warning">
            <LuUsers className="text-3xl" />
          </div>
          <div className="stat-title font-bold text-base-content text-center">
            Cotisations en Attente
          </div>
          <div className="stat-value text-warning text-center">
            {pendingPercentage}%
          </div>
          <div className="stat-desc text-wrap text-center">
            Moyenne de {averageDueAmount.toLocaleString()} XAF par cotisation
          </div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-figure text-info">
            <LuClock className="text-3xl" />
          </div>
          <div className="stat-title font-bold text-base-content text-center">
            Prochaine Échéance
          </div>
          <div className="stat-value text-info text-center">Dans 7j</div>
          <div className="stat-desc text-wrap text-center">
            Rappel envoyé aux membres concernés
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuesStatistics;
