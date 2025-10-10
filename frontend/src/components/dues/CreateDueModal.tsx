import React from "react";
import { LuX } from "react-icons/lu";

interface CreateDueModalProps {
  onClose: () => void;
}

const CreateDueModal: React.FC<CreateDueModalProps> = ({ onClose }) => {
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
          Créer une Nouvelle Cotisation
        </h3>
        <form className="space-y-4">
          <div>
            <label htmlFor="title" className="label">
              <span className="label-text">Titre de la cotisation</span>
            </label>
            <input
              type="text"
              id="title"
              placeholder="Ex: Cotisation Mensuelle Janvier"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label htmlFor="amount" className="label">
              <span className="label-text">Montant (XAF)</span>
            </label>
            <input
              type="number"
              id="amount"
              placeholder="Ex: 10000"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label htmlFor="dueDate" className="label">
              <span className="label-text">Date limite</span>
            </label>
            <input
              type="date"
              id="dueDate"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label htmlFor="members" className="label">
              <span className="label-text">Membres concernés</span>
            </label>
            <select id="members" className="select select-bordered w-full">
              <option disabled selected>
                Sélectionner les membres
              </option>
              <option>Tous les membres</option>
              <option>John Doe</option>
              <option>Jane Smith</option>
            </select>
          </div>
          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              Créer la cotisation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDueModal;
