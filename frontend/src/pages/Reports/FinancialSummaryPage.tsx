import React from 'react';
import { useReportStore } from '../../stores/reportStore';

const FinancialSummaryPage: React.FC = () => {
  const { financialSummary, loading, error, fetchFinancialSummary } = useReportStore();
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [dateError, setDateError] = React.useState('');

  const handleFetchSummary = () => {
    if (startDate && endDate) {
      if (new Date(startDate) > new Date(endDate)) {
        setDateError('La date de début ne peut pas être postérieure à la date de fin.');
      } else {
        setDateError('');
        fetchFinancialSummary(startDate, endDate);
      }
    }
  };

  if (loading) return <p className="font-sans text-base-content">Chargement...</p>;
  if (error) return <p className="text-error font-sans">Erreur: {error}</p>;

  return (
    <div className="p-4 text-base-content">
      <h1 className="text-2xl font-bold font-serif mb-4">Résumé financier</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-4 sm:items-end">
        <div className="form-control w-full sm:w-auto">
          <label className="label">
            <span className="label-text">Date de début</span>
          </label>
          <input
            type="date"
            className="input input-bordered font-sans text-base-content"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-control w-full sm:w-auto">
          <label className="label">
            <span className="label-text">Date de fin</span>
          </label>
          <input
            type="date"
            className="input input-bordered font-sans text-base-content"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button 
          className="btn btn-primary font-sans w-full sm:w-auto"
          onClick={handleFetchSummary}
          disabled={!startDate || !endDate || new Date(startDate) > new Date(endDate)}
        >
          Générer le rapport
        </button>
      </div>

      {dateError && <p className="text-error font-sans">{dateError}</p>}

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
