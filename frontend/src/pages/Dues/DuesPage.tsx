
import React from 'react';
import DuesHeader from '../../components/dues/DuesHeader';
import DuesSummary from '../../components/dues/DuesSummary';
import DuesTable from '../../components/dues/DuesTable';
import DuesStatistics from '../../components/dues/DuesStatistics'; // Renamed from DuesChart
import DuesHistory from '../../components/dues/DuesHistory';
import CreateDueModal from '../../components/dues/CreateDueModal';

const DuesPage: React.FC = () => {
  const [showCreateDueModal, setShowCreateDueModal] = React.useState(false);

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6 lg:p-8">
      <DuesHeader onAddDue={() => setShowCreateDueModal(true)} />
      <DuesSummary />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <DuesTable />
        </div>
        <div>
          <DuesStatistics />
          <DuesHistory />
        </div>
      </div>

      {showCreateDueModal && <CreateDueModal onClose={() => setShowCreateDueModal(false)} />}
    </div>
  );
};

export default DuesPage;
