import React, { useMemo } from "react";
import { LuTrendingUp, LuTrendingDown, LuHourglass } from "react-icons/lu";
import { useDuesStore } from "../../stores/duesStore";
import { DuesStatus } from "../../types/enums";

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

    const statusCounts = memberDues.reduce((acc, due) => {
      acc[due.status] = (acc[due.status] || 0) + 1;
      return acc;
    }, {} as Record<DuesStatus, number>);

    const paidPercentage = Math.round(
      ((statusCounts[DuesStatus.PAID] || 0) / totalDues) * 100
    );
    const partiallyPaidPercentage = Math.round(
      ((statusCounts[DuesStatus.PARTIALLY_PAID] || 0) / totalDues) * 100
    );
    const unpaidPercentage = Math.round(
      ((statusCounts[DuesStatus.UNPAID] || 0) / totalDues) * 100
    );

    return { paidPercentage, partiallyPaidPercentage, unpaidPercentage };
  }, [memberDues]);

  return (
    <div className="bg-base-100 shadow-xl rounded-box mb-6">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 text-base-content">
          Statistiques des Cotisations
        </h2>
        <div className="space-y-4">
          {/* Paid Card */}
          <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
            <div>
              <div className="font-semibold text-base-content/80">Payées</div>
              <div className="text-2xl font-bold text-success">
                {stats.paidPercentage}%
              </div>
            </div>
            <div className="text-success">
              <LuTrendingUp className="h-8 w-8" />
            </div>
          </div>

          {/* Partially Paid Card */}
          <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
            <div>
              <div className="font-semibold text-base-content/80">
                Progressifs
              </div>
              <div className="text-2xl font-bold text-info">
                {stats.partiallyPaidPercentage}%
              </div>
            </div>
            <div className="text-info">
              <LuHourglass className="h-8 w-8" />
            </div>
          </div>

          {/* Unpaid Card */}
          <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
            <div>
              <div className="font-semibold text-base-content/80">
                Non Payées
              </div>
              <div className="text-2xl font-bold text-error">
                {stats.unpaidPercentage}%
              </div>
            </div>
            <div className="text-error">
              <LuTrendingDown className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuesStatistics;
