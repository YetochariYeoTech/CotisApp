
import React from 'react';
import { LuEye, LuPencil, LuTrash2 } from 'react-icons/lu';

const DuesTable = () => {
  const duesData = [
    {
      id: 1,
      member: "John Doe",
      amount: 10000,
      dueDate: "2025-01-31",
      status: "PAID",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: 2,
      member: "Jane Smith",
      amount: 10000,
      dueDate: "2025-01-31",
      status: "OVERDUE",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    {
      id: 3,
      member: "Mike Johnson",
      amount: 10000,
      dueDate: "2025-01-31",
      status: "PENDING",
      avatar: "https://i.pravatar.cc/40?img=3",
    },
    {
      id: 4,
      member: "Alice Brown",
      amount: 10000,
      dueDate: "2025-02-28",
      status: "PAID",
      avatar: "https://i.pravatar.cc/40?img=4",
    },
    {
      id: 5,
      member: "Bob White",
      amount: 10000,
      dueDate: "2025-02-28",
      status: "PENDING",
      avatar: "https://i.pravatar.cc/40?img=5",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return <div className="badge badge-success gap-2">Payé</div>;
      case "OVERDUE":
        return <div className="badge badge-error gap-2">En Retard</div>;
      case "PENDING":
        return <div className="badge badge-warning gap-2">En Attente</div>;
      default:
        return <div className="badge badge-neutral gap-2">Inconnu</div>;
    }
  };

  return (
    <div className="p-6">
      <div className="overflow-x-auto bg-base-100 rounded-box shadow-xl">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Membre</th>
              <th>Montant</th>
              <th>Date limite</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {duesData.map((due) => (
              <tr key={due.id} className="hover:bg-base-200 transition-colors duration-200">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={due.avatar} alt={`Avatar of ${due.member}`} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{due.member}</div>
                      <div className="text-sm opacity-50">ID: {due.id}</div>
                    </div>
                  </div>
                </td>
                <td>{due.amount.toLocaleString()} XAF</td>
                <td>{new Date(due.dueDate).toLocaleDateString()}</td>
                <td>{getStatusBadge(due.status)}</td>
                <th>
                  <button className="btn btn-ghost btn-xs tooltip tooltip-bottom" data-tip="Voir détails">
                    <LuEye className="h-4 w-4" />
                  </button>
                  <button className="btn btn-ghost btn-xs tooltip tooltip-bottom" data-tip="Modifier">
                    <LuPencil className="h-4 w-4" />
                  </button>
                  <button className="btn btn-ghost btn-xs tooltip tooltip-bottom" data-tip="Supprimer">
                    <LuTrash2 className="h-4 w-4" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DuesTable;
