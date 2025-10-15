import React, { useMemo } from 'react';
import { LuTrendingUp, LuTrendingDown, LuHourglass } from 'react-icons/lu';
import { useDuesStore } from '../../stores/duesStore';
import { DuesStatus } from '../../types/enums';

const DuesStatistics: React.FC = () => {
  const { memberDues } = useDuesStore();

  const stats = useMemo(() => {
    const totalDues = memberDues.length;
    if (totalDues === 0) {
      return {
        paidPercentage: 0,
        partiallyPaidPercentage: 0,
        unpaidPercentage: 0,
      };
    }

    const statusCounts = memberDues.reduce(
      (acc, due) => {
        acc[due.status] = (acc[due.status] || 0) + 1;
        return acc;
      },
      {} as Record<DuesStatus, number>
    );

    const paidPercentage = Math.round(((statusCounts[DuesStatus.PAID] || 0) / totalDues) * 100);
    const partiallyPaidPercentage = Math.round(((statusCounts[DuesStatus.PARTIALLY_PAID] || 0) / totalDues) * 100);
    const unpaidPercentage = Math.round(((statusCounts[DuesStatus.UNPAID] || 0) / totalDues) * 100);

    return { paidPercentage, partiallyPaidPercentage, unpaidPercentage };
  }, [memberDues]);

  return (
    <div className="p-6 bg-base-100 shadow-xl rounded-box mb-6">
      <h2 className="text-xl font-bold mb-4 text-base-content">
        Statistiques des Cotisations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat place-items-center">
          <div className="stat-figure text-success">
            <LuTrendingUp className="text-3xl" />
          </div>
          <div className="stat-title font-semibold text-base-content/80">Payées</div>
          <div className="stat-value text-success">{stats.paidPercentage}%</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-figure text-info">
            <LuHourglass className="text-3xl" />
          </div>
          <div className="stat-title font-semibold text-base-content/80">Partielles</div>
          <div className="stat-value text-info">{stats.partiallyPaidPercentage}%</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-figure text-error">
            <LuTrendingDown className="text-3xl" />
          </div>
          <div className="stat-title font-semibold text-base-content/80">Non Payées</div>
          <div className="stat-value text-error">{stats.unpaidPercentage}%</div>
        </div>
      </div>
    </div>
  );
};

export default DuesStatistics;