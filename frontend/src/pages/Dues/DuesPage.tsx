import React from 'react';
import { useDuesStore } from '../../stores/duesStore';
import { useAuthStore } from '../../stores/authStore';
import { useMemberStore } from '../../stores/memberStore';
import { Role } from '../../types/enums';

const DuesPage: React.FC = () => {
  const { loading: duesLoading, error: duesError, generateDues, payDues } = useDuesStore();
  const { user } = useAuthStore();
  const { fetchMemberDuesReport, loading: memberLoading, error: memberError } = useMemberStore();
  const [memberDues, setMemberDues] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (user && user.role === Role.MEMBER) {
      fetchMemberDuesReport(user._id).then(setMemberDues);
    }
  }, [user, fetchMemberDuesReport]);

  const handleGenerateDues = async () => {
    await generateDues();
    // Optionally refetch dues or show a success message
  };

  const handlePayDues = async (duesId: string, amount: number) => {
    if (user) {
      await payDues(user._id, duesId, amount);
      // Optionally refetch dues or show a success message
      if (user.role === Role.MEMBER) {
        fetchMemberDuesReport(user._id).then(setMemberDues); // Refetch after payment
      }
    }
  };

  if (duesLoading || memberLoading) return <p className="font-sans text-base-content">Chargement...</p>;
  if (duesError || memberError) return <p className="text-error font-sans">Erreur: {duesError || memberError}</p>;

  return (
    <div className="p-4 text-base-content">
      <h1 className="text-2xl font-bold font-serif mb-4">Gestion des cotisations</h1>
      {user?.role === Role.ADMIN && (
        <button className="btn btn-primary mb-4 font-sans" onClick={handleGenerateDues}>
          Générer les cotisations
        </button>
      )}

      {user?.role === Role.MEMBER && memberDues.length > 0 && (
        <div className="overflow-x-auto bg-base-100 rounded-box shadow-xl">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="font-sans text-base-content">Période</th>
                <th className="font-sans text-base-content">Montant attendu</th>
                <th className="font-sans text-base-content">Montant payé</th>
                <th className="font-sans text-base-content">Date d'échéance</th>
                <th className="font-sans text-base-content">Statut</th>
                <th className="font-sans text-base-content">Actions</th>
              </tr>
            </thead>
            <tbody>
              {memberDues.map((duesItem) => (
                <tr key={duesItem._id}>
                  <td className="font-sans text-base-content">{duesItem.period}</td>
                  <td className="font-sans text-base-content">{duesItem.expectedAmount}</td>
                  <td className="font-sans text-base-content">{duesItem.paidAmount}</td>
                  <td className="font-sans text-base-content">{new Date(duesItem.dueDate).toLocaleDateString()}</td>
                  <td className="font-sans text-base-content">{duesItem.status}</td>
                  <td>
                    {duesItem.status !== 'PAID' && (
                      <button
                        className="btn btn-sm btn-success font-sans"
                        onClick={() => handlePayDues(duesItem._id, duesItem.expectedAmount - duesItem.paidAmount)}
                      >
                        Payer le reste
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {user?.role === Role.MEMBER && memberDues.length === 0 && !duesLoading && !memberLoading && (
        <p className="font-sans text-base-content">Aucune cotisation trouvée pour vous.</p>
      )}

      {(user?.role === Role.ADMIN || user?.role === Role.TREASURER) && (
        <p className="font-sans text-base-content">Vue complète des cotisations pour les administrateurs/trésoriers à implémenter.</p>
      )}
    </div>
  );
};

export default DuesPage;
