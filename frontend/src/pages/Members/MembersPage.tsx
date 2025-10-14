import React from 'react';
import { Link } from 'react-router-dom';
import { useMemberStore } from '../../stores/memberStore';

const MembersPage: React.FC = () => {
  const { members, loading, error, fetchMembers } = useMemberStore();

  React.useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  if (loading) return <p className="font-sans text-base-content">Chargement...</p>;
  if (error) return <p className="text-error font-sans">Erreur: {error}</p>;

  return (
    <div className="p-4 text-base-content">
      <h1 className="text-2xl font-bold font-serif mb-4">Membres</h1>
      <div className="overflow-x-auto bg-base-100 rounded-box shadow-xl">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="font-sans text-base-content">Nom complet</th>
              <th className="font-sans text-base-content">Email</th>
              <th className="font-sans text-base-content">Numéro de téléphone</th>
              <th className="font-sans text-base-content">Rôle</th>
              <th className="font-sans text-base-content">Statut de contribution</th>
              <th className="font-sans text-base-content">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member._id}>
                <td className="font-sans text-base-content">{member.fullName}</td>
                <td className="font-sans text-base-content">{member.email}</td>
                <td className="font-sans text-base-content">{member.phoneNumber}</td>
                <td className="font-sans text-base-content">{member.role}</td>
                <td className="font-sans text-base-content">{member.contributionStatus}</td>
                <td>
                  <Link to={`/members/${member._id}`} className="btn btn-sm btn-info font-sans">Voir</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembersPage;
