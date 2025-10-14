import React, { useEffect, useState } from "react";
import api from "../../api/axios";

interface DuesSummary {
  member: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  totalDues: number;
  totalPaid: number;
  balance: number;
}

const DuesSummaryPage: React.FC = () => {
  const [duesSummary, setDuesSummary] = useState<DuesSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDuesSummary = async () => {
      setLoading(true);
      try {
        const response = await api.get("/dues/dues/total-by-member");
        setDuesSummary(response.data);
      } catch {
        setError("Échec de la récupération du résumé des cotisations");
      }
      setLoading(false);
    };

    fetchDuesSummary();
  }, []);

  if (loading)
    return <p className="font-sans text-base-content">Chargement...</p>;
  if (error) return <p className="text-error font-sans">Erreur: {error}</p>;

  return (
    <div className="p-4 text-base-content">
      <h1 className="text-2xl font-bold font-serif mb-4">
        Résumé des cotisations par membre
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full font-sans">
          <thead>
            <tr>
              <th>Membre</th>
              <th>Cotisations totales</th>
              <th>Total payé</th>
              <th>Solde</th>
            </tr>
          </thead>
          <tbody>
            {duesSummary.map((summary) => (
              <tr key={summary.member._id}>
                <td>
                  {summary.member.firstName} {summary.member.lastName}
                </td>
                <td>{summary.totalDues}</td>
                <td>{summary.totalPaid}</td>
                <td>{summary.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DuesSummaryPage;
