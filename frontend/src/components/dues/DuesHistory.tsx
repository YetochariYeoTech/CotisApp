import React, { useEffect } from 'react';
import { LuDollarSign, LuCalendar } from 'react-icons/lu';
import { useTransactionStore } from '../../stores/transactionStore';
import { useAuthStore } from '../../stores/authStore';
import { TransactionStatus } from '../../types/enums';

const DuesHistory: React.FC = () => {
  const { transactions, loading, fetchTransactions } = useTransactionStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?._id) {
      // Fetch only transactions for the current user
      fetchTransactions(user._id);
    }
  }, [user, fetchTransactions]);

  const getStatusInfo = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.VALIDATED:
        return { text: 'Validé', color: 'text-success' };
      case TransactionStatus.PENDING:
        return { text: 'En attente', color: 'text-warning' };
      default:
        return { text: 'Inconnu', color: 'text-neutral' };
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-base-100 shadow-xl rounded-box">
        <h2 className="text-xl font-bold mb-4 text-base-content">Paiements Récents</h2>
        <div className="flex justify-center items-center p-4"><span className="loading loading-sm loading-spinner"></span></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-base-100 shadow-xl rounded-box">
      <h2 className="text-xl font-bold mb-4 text-base-content">Mes Paiements Récents</h2>
      <ul className="menu bg-base-100 w-full rounded-box">
        {transactions.slice(0, 5).map((payment) => {
          const statusInfo = getStatusInfo(payment.status);
          return (
            <li key={payment._id}>
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full bg-${statusInfo.color.replace('text-', '')}/10`}>
                    <LuDollarSign className={`w-5 h-5 ${statusInfo.color}`} />
                  </div>
                  <div>
                    <div className="font-bold text-base-content">
                      Paiement de {payment.amount.toLocaleString()} XAF
                    </div>
                    <div className={`text-sm font-semibold ${statusInfo.color}`}>
                      {statusInfo.text}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs opacity-70 flex items-center gap-1">
                    <LuCalendar className="w-3 h-3" />
                    {new Date(payment.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {transactions.length === 0 && !loading && (
        <p className="text-center text-base-content/60 py-4">Aucun paiement récent.</p>
      )}
    </div>
  );
};

export default DuesHistory;