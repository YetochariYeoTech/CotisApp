import React from "react";
import { LuDollarSign, LuCalendar } from "react-icons/lu";

const DuesHistory = () => {
  const recentPayments = [
    {
      id: 1,
      member: "John Doe",
      amount: 10000,
      date: "2025-10-08",
      avatar: "https://i.pravatar.cc/40?img=1",
      status: "Payé",
      statusColor: "text-success",
    },
    {
      id: 2,
      member: "Alice Brown",
      amount: 12000,
      date: "2025-10-07",
      avatar: "https://i.pravatar.cc/40?img=4",
      status: "Payé",
      statusColor: "text-success",
    },
    {
      id: 3,
      member: "Bob White",
      amount: 10000,
      date: "2025-10-06",
      avatar: "https://i.pravatar.cc/40?img=5",
      status: "En attente",
      statusColor: "text-warning",
    },
  ];

  return (
    <div className="p-6 bg-base-100 shadow-xl rounded-box">
      <h2 className="text-2xl font-serif font-bold mb-4 text-base-content">
        Paiements Récents
      </h2>
      <ul className="menu bg-base-100 w-full rounded-box">
        {recentPayments.map((payment) => (
          <li key={payment.id}>
            <a>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-10 h-10">
                    <img
                      src={payment.avatar}
                      alt={`Avatar of ${payment.member}`}
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-base-content">
                    {payment.member}
                  </div>
                  <div className="text-sm opacity-70 flex items-center gap-1">
                    <LuDollarSign className="w-4 h-4" />{" "}
                    {payment.amount.toLocaleString()} XAF
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span
                  className={`text-sm font-semibold ${payment.statusColor}`}
                >
                  {payment.status}
                </span>
                <span className="text-xs opacity-50 flex items-center gap-1">
                  <LuCalendar className="w-3 h-3" />{" "}
                  {new Date(payment.date).toLocaleDateString()}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-center">
        <button className="btn btn-link text-primary">
          Voir tout l'historique
        </button>
      </div>
    </div>
  );
};

export default DuesHistory;
