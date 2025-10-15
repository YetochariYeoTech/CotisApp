import React, { useState, useEffect } from 'react';
import { LuSearch, LuRefreshCw } from 'react-icons/lu';
import type { MemberDue } from '../../types/dues';
import { DuesStatus, AccountStatus } from '../../types/enums';
import { useDuesStore } from '../../stores/duesStore';
import { useAuthStore } from '../../stores/authStore';

interface DuesTableProps {
  memberDues: MemberDue[];
  loading: boolean;
  onRefresh: () => void;
}

type FilterStatus = 'all' | 'paid' | 'unpaid' | 'partially_paid';

const DuesTable: React.FC<DuesTableProps> = ({ memberDues, loading, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { payDue } = useDuesStore();
  const { user } = useAuthStore();

  const isAccountActive = user?.accountStatus === AccountStatus.ACTIVE;

  const handlePay = async (memberDue: MemberDue) => {
    if (!isAccountActive) {
      alert("Veuillez activer votre compte pour pouvoir payer les cotisations.");
      return;
    }
    const amountString = prompt(`Montant à payer pour ${memberDue.dueId.label} (Restant: ${memberDue.dueId.expectedAmount - memberDue.paidAmount} XAF)`);
    if (amountString) {
      const amount = parseFloat(amountString);
      if (!isNaN(amount) && amount > 0) {
        await payDue({ 
          memberDueId: memberDue._id, 
          amount, 
          memberId: memberDue.memberId 
        });
      } else {
        alert("Veuillez entrer un montant valide.");
      }
    }
  };

  const filteredDues = memberDues
    .filter(due =>
      due.dueId.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      due.memberId.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(due => {
      if (filterStatus === 'paid') return due.status === DuesStatus.PAID;
      if (filterStatus === 'unpaid') return due.status === DuesStatus.UNPAID;
      if (filterStatus === 'partially_paid') return due.status === DuesStatus.PARTIALLY_PAID;
      return true; // 'all'
    });

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDues = filteredDues.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDues.length / itemsPerPage);

  const getStatusBadge = (status: DuesStatus) => {
    switch (status) {
      case DuesStatus.PAID:
        return <div className="badge badge-success gap-2">Payé</div>;
      case DuesStatus.PARTIALLY_PAID:
        return <div className="badge badge-info gap-2">Progressif</div>;
      case DuesStatus.UNPAID:
        return <div className="badge badge-warning gap-2">Non Payé</div>;
      default:
        return <div className="badge badge-neutral gap-2">Inconnu</div>;
    }
  };

  // Do not show loading spinner here, as the parent shows a page-level one.
  // The spinning icon on the refresh button will indicate loading.

  return (
    <div className="p-6 bg-base-100 shadow-xl rounded-box">
      <div className="mb-4 flex flex-col md:flex-row items-center gap-4">
        <label className="input input-bordered flex items-center gap-2 flex-grow">
          <input
            type="text"
            className="grow"
            placeholder="Rechercher par label..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <LuSearch className="h-4 w-4 opacity-70" />
        </label>
        <div className="flex items-center gap-2">
          <div className="join">
            <button className={`join-item btn btn-sm ${filterStatus === 'all' ? 'btn-active' : ''}`} onClick={() => setFilterStatus('all')}>Tous</button>
            <button className={`join-item btn btn-sm ${filterStatus === 'paid' ? 'btn-active' : ''}`} onClick={() => setFilterStatus('paid')}>Payés</button>
            <button className={`join-item btn btn-sm ${filterStatus === 'partially_paid' ? 'btn-active' : ''}`} onClick={() => setFilterStatus('partially_paid')}>Progressifs</button>
            <button className={`join-item btn btn-sm ${filterStatus === 'unpaid' ? 'btn-active' : ''}`} onClick={() => setFilterStatus('unpaid')}>Non Payés</button>
          </div>
          <button className="btn btn-ghost btn-sm btn-circle" onClick={onRefresh} disabled={loading} title="Rafraîchir les données">
            <LuRefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Label de la Cotisation</th>
              <th>Montant Attendu</th>
              <th>Montant Payé</th>
              <th>Solde Restant</th>
              <th>Date Limite</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentDues.map((due) => {
              const balance = due.dueId.expectedAmount - due.paidAmount;
              return (
                <tr key={due._id} className="hover">
                  <td>
                    <div>
                      <div className="font-bold">{due.dueId.label}</div>
                      <div className="text-sm opacity-50">Période: {due.dueId.period}</div>
                    </div>
                  </td>
                  <td>{due.dueId.expectedAmount.toLocaleString()} XAF</td>
                  <td className="text-success">{due.paidAmount.toLocaleString()} XAF</td>
                  <td className={`font-semibold ${balance > 0 ? 'text-error' : 'text-success'}`}>{balance.toLocaleString()} XAF</td>
                  <td>{new Date(due.dueId.dueDate).toLocaleDateString()}</td>
                  <td>{getStatusBadge(due.status)}</td>
                  <th>
                    <button 
                      className="btn btn-primary btn-xs"
                      onClick={() => handlePay(due)}
                      disabled={due.status === DuesStatus.PAID || !isAccountActive}
                      title={!isAccountActive ? "Veuillez activer votre compte pour payer" : "Effectuer un paiement"}
                    >
                      Payer
                    </button>
                  </th>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="pt-4 flex justify-center">
          <div className="join">
            <button 
              className="join-item btn"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              «
            </button>
            <button className="join-item btn">Page {currentPage} sur {totalPages}</button>
            <button 
              className="join-item btn"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DuesTable;