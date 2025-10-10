import React from 'react';
import { useParams } from 'react-router-dom';
import { useMemberStore } from '../../stores/memberStore';

const MemberDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchMemberById, fetchMemberDuesReport, loading, error } = useMemberStore();
  const [member, setMember] = React.useState<any>(null);
  const [duesReport, setDuesReport] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (id) {
      fetchMemberById(id).then(setMember);
      fetchMemberDuesReport(id).then(setDuesReport);
    }
  }, [id, fetchMemberById, fetchMemberDuesReport]);

  if (loading) return <p className="font-sans text-base-content">Chargement...</p>;
  if (error) return <p className="text-error font-sans">Erreur: {error}</p>;
  if (!member) return <p className="font-sans text-base-content">Membre non trouvé.</p>;

  return (
    <div className="p-4 text-base-content">
      <h1 className="text-2xl font-bold font-serif mb-4">Détails du membre: {member.fullName}</h1>
      <div className="card bg-base-100 shadow-xl mb-4">
        <div className="card-body">
          <h2 className="card-title font-serif text-base-content">Informations personnelles</h2>
          <p className="font-sans"><strong>Email:</strong> {member.email}</p>
          <p className="font-sans"><strong>Téléphone:</strong> {member.phoneNumber}</p>
          <p className="font-sans"><strong>Rôle:</strong> {member.role}</p>
          <p className="font-sans"><strong>Date d'adhésion:</strong> {new Date(member.joinDate).toLocaleDateString()}</p>
          <p className="font-sans"><strong>Statut de contribution:</strong> {member.contributionStatus}</p>
          <p className="font-sans"><strong>Statut du compte:</strong> {member.accountStatus}</p>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title font-serif text-base-content">Rapport de cotisations</h2>
          {duesReport.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th className="font-sans text-base-content">Période</th>
                    <th className="font-sans text-base-content">Montant attendu</th>
                    <th className="font-sans text-base-content">Montant payé</th>
                    <th className="font-sans text-base-content">Date d'échéance</th>
                    <th className="font-sans text-base-content">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {duesReport.map((duesItem, index) => (
                    <tr key={index}>
                      <td className="font-sans text-base-content">{duesItem.period}</td>
                      <td className="font-sans text-base-content">{duesItem.expectedAmount}</td>
                      <td className="font-sans text-base-content">{duesItem.paidAmount}</td>
                      <td className="font-sans text-base-content">{new Date(duesItem.dueDate).toLocaleDateString()}</td>
                      <td className="font-sans text-base-content">{duesItem.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="font-sans text-base-content">Aucun rapport de cotisations disponible.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsPage;
