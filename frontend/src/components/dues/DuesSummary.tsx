import React, { useMemo } from 'react';
import { LuWallet, LuPiggyBank, LuBadgeHelp, LuBadgeCheck } from 'react-icons/lu';
import { useDuesStore } from '../../stores/duesStore';
import { DuesStatus } from '../../types/enums';

const DuesSummary: React.FC = () => {
  const { memberDues } = useDuesStore();

  const summary = useMemo(() => {
    if (!memberDues || memberDues.length === 0) {
      return {
        totalExpected: 0,
        totalPaid: 0,
        totalBalance: 0,
        overdueCount: 0,
      };
    }

    const today = new Date();

    return memberDues.reduce(
      (acc, due) => {
        acc.totalExpected += due.dueId.expectedAmount;
        acc.totalPaid += due.paidAmount;
        
        const dueDate = new Date(due.dueId.dueDate);
        if (due.status !== DuesStatus.PAID && dueDate < today) {
          acc.overdueCount += 1;
        }

        return acc;
      },
      { totalExpected: 0, totalPaid: 0, totalBalance: 0, overdueCount: 0 }
    );
  }, [memberDues]);

  const totalBalance = summary.totalExpected - summary.totalPaid;

  const summaryCards = [
    {
      id: 1,
      title: "Total Dû",
      value: `${summary.totalExpected.toLocaleString()} XAF`,
      icon: <LuWallet className="text-primary" />,
      colorClass: "border-primary",
    },
    {
      id: 2,
      title: "Total Payé",
      value: `${summary.totalPaid.toLocaleString()} XAF`,
      icon: <LuPiggyBank className="text-success" />,
      colorClass: "border-success",
    },
    {
      id: 3,
      title: "Solde Restant",
      value: `${totalBalance.toLocaleString()} XAF`,
      icon: <LuBadgeHelp className="text-error" />,
      colorClass: "border-error",
    },
    {
      id: 4,
      title: "Cotisations en Retard",
      value: summary.overdueCount,
      icon: <LuBadgeCheck className="text-warning" />,
      colorClass: "border-warning",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryCards.map((card) => (
        <div key={card.id} className={`card card-compact bg-base-100 shadow-md border-l-4 ${card.colorClass}`}>
          <div className="card-body">
            <div className="flex items-center justify-between">
              <h2 className="card-title text-base font-semibold text-base-content/70">{card.title}</h2>
              <div className={`text-2xl`}>
                {card.icon}
              </div>
            </div>
            <p className="text-2xl font-bold text-base-content">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DuesSummary;