import React from 'react';

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirmation</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>Annuler</button>
          <button type="button" className="btn btn-primary" onClick={onConfirm}>Confirmer</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
