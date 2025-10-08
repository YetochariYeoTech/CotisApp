import React from 'react';
import { Link } from 'react-router-dom';
import { useMemberStore } from '../../stores/memberStore';
import { Role } from '../../types/enums';
import { useAuthStore } from '../../stores/authStore';

const MembersPage: React.FC = () => {
  const { members, loading, error, fetchMembers } = useMemberStore();
  const { user } = useAuthStore();

  React.useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  if (loading) return <p className="font-sans">Chargement...</p>;
  if (error) return <p className="text-error font-sans">Erreur: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold font-serif mb-4">Membres</h1>
      <div className="overflow-x-auto bg-base-100 rounded-box shadow-xl">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="font-sans">Nom complet</th>
              <th className="font-sans">Email</th>
              <th className="font-sans">Numéro de téléphone</th>
              <th className="font-sans">Rôle</th>
              <th className="font-sans">Statut de contribution</th>
              <th className="font-sans">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member._id}>
                <td className="font-sans">{member.fullName}</td>
                <td className="font-sans">{member.email}</td>
                <td className="font-sans">{member.phoneNumber}</td>
                <td className="font-sans">{member.role}</td>
                <td className="font-sans">{member.contributionStatus}</td>
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
