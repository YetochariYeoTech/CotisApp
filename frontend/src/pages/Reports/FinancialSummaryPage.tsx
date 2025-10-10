import React from 'react';
import { useReportStore } from '../../stores/reportStore';

const FinancialSummaryPage: React.FC = () => {
  const { financialSummary, loading, error, fetchFinancialSummary } = useReportStore();
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  const handleFetchSummary = () => {
    if (startDate && endDate) {
      fetchFinancialSummary(startDate, endDate);
    }
  };

  if (loading) return <p className="font-sans text-base-content">Chargement...</p>;
  if (error) return <p className="text-error font-sans">Erreur: {error}</p>;

  return (
    <div className="p-4 text-base-content">
      <h1 className="text-2xl font-bold font-serif mb-4">Résumé financier</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="date"
          className="input input-bordered font-sans text-base-content"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="input input-bordered font-sans text-base-content"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button className="btn btn-primary font-sans">Générer le rapport</button>
      </div>

      {financialSummary ? (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title font-serif text-base-content">Résumé</h2>
            <p className="font-sans"><strong>Montant total:</strong> {financialSummary.totalAmount}</p>
            <p className="font-sans"><strong>Nombre de transactions:</strong> {financialSummary.count}</p>
          </div>
        </div>
      ) : (
        <p className="font-sans">Sélectionnez une plage de dates et générez le rapport.</p>
      )}
    </div>
  );
};

export default FinancialSummaryPage;
