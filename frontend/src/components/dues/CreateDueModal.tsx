import React, { useState, useEffect } from "react";
import { LuX } from "react-icons/lu";
import { useDuesStore } from "../../stores/duesStore";
import type { CreateDuePayload } from "../../types/dues";

interface CreateDueModalProps {
  onClose: () => void;
}

const CreateDueModal: React.FC<CreateDueModalProps> = ({ onClose }) => {
  const [label, setLabel] = useState("");
  const [period, setPeriod] = useState("");
  const [year, setYear] = useState<number | string>("");
  const [month, setMonth] = useState<number | string>("");
  const [expectedAmount, setExpectedAmount] = useState<number | string>("");
  const [dueDate, setDueDate] = useState("");

  const { createDue, loading } = useDuesStore();

  useEffect(() => {
    if (year && month) {
      // Format month to be two digits (e.g., 01, 02, 12)
      const monthString = String(month).padStart(2, "0");
      setPeriod(`${year}-${monthString}`);
    }
  }, [year, month]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label || !period || !expectedAmount || !dueDate) {
      // TODO: Add proper validation feedback to the user
      console.error("All fields are required");
      return;
    }
    const payload: CreateDuePayload = {
      label,
      period,
      expectedAmount: Number(expectedAmount),
      dueDate,
    };
    await createDue(payload);
    if (!loading) {
      onClose();
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >
          <LuX className="h-5 w-5" />
        </button>
        <h3 className="font-bold text-2xl text-primary mb-4">
          Créer une Cotisation (pour tous les membres)
        </h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="label" className="label">
              <span className="label-text">Label de la cotisation</span>
            </label>
            <input
              type="text"
              id="label"
              placeholder="Ex: Cotisation Annuelle 2025"
              className="input input-bordered w-full"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Période</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <select
                className="select select-bordered w-full"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              >
                <option disabled value="">
                  Année
                </option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <select
                className="select select-bordered w-full"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                required
              >
                <option disabled value="">
                  Mois
                </option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {new Date(0, m - 1).toLocaleString("fr-FR", { month: "long" })}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="expectedAmount" className="label">
              <span className="label-text">Montant Attendu (XAF)</span>
            </label>
            <input
              type="number"
              id="expectedAmount"
              placeholder="Ex: 5000"
              className="input input-bordered w-full"
              value={expectedAmount}
              onChange={(e) => setExpectedAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="dueDate" className="label">
              <span className="label-text">Date Limite de Paiement</span>
            </label>
            <input
              type="date"
              id="dueDate"
              className="input input-bordered w-full"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={loading}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Création...' : 'Créer pour tous'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDueModal;