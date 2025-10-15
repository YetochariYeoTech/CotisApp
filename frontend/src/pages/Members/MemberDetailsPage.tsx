import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useMemberStore } from "../../stores/memberStore";
import type { Member } from "../../types/member";
import type { Transaction } from "../../types/transaction";
import type { DuesReportItem } from "../../types/dues";
import { LuArrowLeft, LuUser, LuMail, LuPhone, LuCalendar, LuShieldCheck, LuShieldX, LuWallet, LuPiggyBank, LuBadgeHelp } from "react-icons/lu";
import { DuesStatus, AccountStatus, ContributionStatus } from "../../types/enums";

// A small component for status badges to keep the code clean
const StatusBadge: React.FC<{ status: string; type: 'account' | 'contribution' }> = ({ status, type }) => {
  const style = {
    [AccountStatus.ACTIVE]: "badge-success",
    [AccountStatus.SUSPENDED]: "badge-error",
    [ContributionStatus.UP_TO_DATE]: "badge-success",
    [ContributionStatus.LATE]: "badge-error",
  }[status] || "badge-neutral";

  return <span className={`badge ${style}`}>{status}</span>;
};

const MemberDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    fetchMemberById, 
    fetchMemberDuesReport, 
    fetchMemberTransactions, 
    loading, 
    error 
  } = useMemberStore();
  
  const [member, setMember] = useState<Member | null>(null);
  const [duesReport, setDuesReport] = useState<DuesReportItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState('dues');

  useEffect(() => {
    if (id) {
      fetchMemberById(id).then(setMember);
      fetchMemberDuesReport(id).then(setDuesReport);
      fetchMemberTransactions(id).then(setTransactions);
    }
  }, [id, fetchMemberById, fetchMemberDuesReport, fetchMemberTransactions]);

  const financialSummary = React.useMemo(() => {
    return duesReport.reduce((acc, due) => {
      acc.totalExpected += due.expectedAmount;
      acc.totalPaid += due.paidAmount;
      return acc;
    }, { totalExpected: 0, totalPaid: 0 });
  }, [duesReport]);

  if (loading && !member) return <div className="p-6"><span className="loading loading-lg"></span></div>;
  if (error) return <p className="text-error p-6">Erreur: {error}</p>;
  if (!member) return <p className="p-6">Membre non trouvé.</p>;

  return (
    <div className="p-4 md:p-6 text-base-content space-y-6">
      {/* Header and Back Button */}
      <div className="flex items-center justify-between">
        <Link to="/members" className="btn btn-ghost">
          <LuArrowLeft />
          Retour à la liste
        </Link>
        <div className="flex items-center gap-2">
            <button className="btn btn-outline btn-primary btn-sm">Modifier</button>
            <button className="btn btn-outline btn-error btn-sm">Suspendre</button>
        </div>
      </div>

      {/* Member Identity Card */}
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <div className="card-body">
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={`https://i.pravatar.cc/150?u=${member._id}`} alt={`Avatar of ${member.fullName}`} />
                    </div>
                </div>
                <div className="flex-grow text-center sm:text-left">
                    <h1 className="text-3xl font-bold font-serif">{member.fullName}</h1>
                    <p className="text-base-content/70">Membre depuis le {new Date(member.joinDate).toLocaleDateString()}</p>
                    <div className="flex gap-2 mt-2 justify-center sm:justify-start">
                        <StatusBadge status={member.accountStatus} type="account" />
                        <StatusBadge status={member.contributionStatus} type="contribution" />
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stat bg-base-100 shadow rounded-lg"><div className="stat-figure text-error"><LuBadgeHelp/></div><div className="stat-title">Solde Actuel</div><div className="stat-value text-error">{(financialSummary.totalExpected - financialSummary.totalPaid).toLocaleString()} XAF</div></div>
        <div className="stat bg-base-100 shadow rounded-lg"><div className="stat-figure text-success"><LuPiggyBank/></div><div className="stat-title">Total Payé (Historique)</div><div className="stat-value text-success">{financialSummary.totalPaid.toLocaleString()} XAF</div></div>
      </div>

      {/* Detailed History Tabs */}
      <div>
        <div className="tabs tabs-boxed mb-4">
          <a className={`tab ${activeTab === 'dues' ? 'tab-active' : ''}`} onClick={() => setActiveTab('dues')}>Cotisations</a> 
          <a className={`tab ${activeTab === 'transactions' ? 'tab-active' : ''}`} onClick={() => setActiveTab('transactions')}>Transactions</a>
        </div>

        {/* Dues Tab Content */}
        {activeTab === 'dues' && (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Historique des Cotisations</h2>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead><tr><th>Période</th><th>Montant Attendu</th><th>Montant Payé</th><th>Date Limite</th><th>Statut</th></tr></thead>
                  <tbody>
                    {duesReport.map((item, i) => <tr key={i}><td>{item.period}</td><td>{item.expectedAmount.toLocaleString()} XAF</td><td>{item.paidAmount.toLocaleString()} XAF</td><td>{new Date(item.dueDate).toLocaleDateString()}</td><td>{item.status}</td></tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab Content */}
        {activeTab === 'transactions' && (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Historique des Transactions</h2>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead><tr><th>Date</th><th>Montant</th><th>Type</th><th>Statut</th></tr></thead>
                  <tbody>
                    {transactions.map(t => <tr key={t._id}><td>{new Date(t.date).toLocaleString()}</td><td>{t.amount.toLocaleString()} XAF</td><td>{t.type}</td><td>{t.status}</td></tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberDetailsPage;
