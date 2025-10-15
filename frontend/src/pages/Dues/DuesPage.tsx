import React, { useEffect, useState } from 'react';
import DuesHeader from '../../components/dues/DuesHeader';
import DuesTable from '../../components/dues/DuesTable';
import CreateDueModal from '../../components/dues/CreateDueModal';
import { useDuesStore } from '../../stores/duesStore';
import { useAuthStore } from '../../stores/authStore';

// TODO: Refactor DuesSummary, DuesStatistics, and DuesHistory to work with the new data model
import DuesSummary from '../../components/dues/DuesSummary';
import DuesStatistics from '../../components/dues/DuesStatistics';
import DuesHistory from '../../components/dues/DuesHistory';

const DuesPage: React.FC = () => {
  const [showCreateDueModal, setShowCreateDueModal] = useState(false);
  const { memberDues, loading, fetchMemberDues } = useDuesStore();
  const { user } = useAuthStore();

  useEffect(() => {
    // Assuming the user object has the member's ID as _id
    // In a real app, you might need to fetch member details separately if the user is not the member
    if (user?._id) {
      fetchMemberDues(user._id);
    }
  }, [user, fetchMemberDues]);

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6 lg:p-8">
      <DuesHeader onAddDue={() => setShowCreateDueModal(true)} />
      
      <div className="mb-6">
        <DuesSummary />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <DuesTable memberDues={memberDues} loading={loading} />
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