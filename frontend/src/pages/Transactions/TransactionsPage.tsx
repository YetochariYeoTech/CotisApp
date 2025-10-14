import React from 'react';
import { useTransactionStore } from '../../stores/transactionStore';
import { useAuthStore } from '../../stores/authStore';
import { Role } from '../../types/enums';

const TransactionsPage: React.FC = () => {
  const { loading, error } = useTransactionStore();
  const { user } = useAuthStore();

  // Assuming there will be a fetchTransactions endpoint or similar
  // React.useEffect(() => {
  //   fetchTransactions();
  // }, [fetchTransactions]);

  // const handleValidateTransaction = async (transactionId: string) => {
  //   await validateTransaction(transactionId);
  //   // Optionally refetch transactions or show a success message
  // };

  if (loading) return <p className="font-sans text-base-content">Chargement...</p>;
  if (error) return <p className="text-error font-sans">Erreur: {error}</p>;

  return (
    <div className="p-4 text-base-content">
      <h1 className="text-2xl font-bold font-serif mb-4">Gestion des transactions</h1>
      <div className="overflow-x-auto bg-base-100 rounded-box shadow-xl">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="font-sans text-base-content">ID Membre</th>
              <th className="font-sans text-base-content">Montant</th>
              <th className="font-sans text-base-content">Type</th>
              <th className="font-sans text-base-content">Statut</th>
              <th className="font-sans text-base-content">Date</th>
              {user?.role === Role.TREASURER && <th className="font-sans text-base-content">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {/* Placeholder for transactions list */}
            <tr>
              <td className="font-sans text-base-content">member123</td>
              <td className="font-sans text-base-content">100</td>
              <td className="font-sans text-base-content">DUES</td>
              <td className="font-sans text-base-content">PENDING</td>
              <td className="font-sans text-base-content">2025-10-08</td>
              {user?.role === Role.TREASURER && (
                <td>
                  <button className="btn btn-sm btn-success font-sans">Valider</button>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPage;
