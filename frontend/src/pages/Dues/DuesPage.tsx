import React from 'react';
import { useDuesStore } from '../../stores/duesStore';
import { useAuthStore } from '../../stores/authStore';
import { Role } from '../../types/enums';

const DuesPage: React.FC = () => {
  const { dues, loading, error, generateDues, payDues } = useDuesStore();
  const { user } = useAuthStore();

  const handleGenerateDues = async () => {
    await generateDues();
    // Optionally refetch dues or show a success message
  };

  const handlePayDues = async (duesId: string, amount: number) => {
    if (user) {
      await payDues(user._id, duesId, amount);
      // Optionally refetch dues or show a success message
    }
  };

  if (loading) return <p className="font-sans">Chargement...</p>;
  if (error) return <p className="text-error font-sans">Erreur: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold font-serif mb-4">Gestion des cotisations</h1>
      {user?.role === Role.ADMIN && (
        <button className="btn btn-primary mb-4 font-sans" onClick={handleGenerateDues}>
          Générer les cotisations
        </button>
      )}

      <div className="overflow-x-auto bg-base-100 rounded-box shadow-xl">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="font-sans">Période</th>
              <th className="font-sans">Montant attendu</th>
              <th className="font-sans">Montant payé</th>
              <th className="font-sans">Date d'échéance</th>
              <th className="font-sans">Statut</th>
              <th className="font-sans">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder for dues list */}
            <tr>
              <td className="font-sans">Exemple Période</td>
              <td className="font-sans">100</td>
              <td className="font-sans">50</td>
              <td className="font-sans">2025-12-31</td>
              <td className="font-sans">PARTIALLY_PAID</td>
              <td>
                <button className="btn btn-sm btn-success font-sans" onClick={() => handlePayDues('someDuesId', 50)}>
                  Payer le reste
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DuesPage;
