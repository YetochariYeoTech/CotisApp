import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Event } from '../../types/event';
import ConfirmationModal from '../common/ConfirmationModal'; // Import the new ConfirmationModal

interface ContributeToEventModalProps {
  event: Event;
  onClose: () => void;
  onContribute: (eventId: string, amount: number) => Promise<void>;
}

const contributionSchema = (minAmount: number) => z.object({
  amount: z.number()
    .min(minAmount, { message: `Le montant ne peut pas être inférieur à ${minAmount} XAF` })
    .refine(val => val > 0, { message: "Le montant doit être positif" }),
});

type ContributionFormInputs = z.infer<ReturnType<typeof contributionSchema>>;

const ContributeToEventModal: React.FC<ContributeToEventModalProps> = ({ event, onClose, onContribute }) => {
  const minAmount = event.minimalAmount; // Assuming event has a minimalAmount (changed from expectedAmount)

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [contributionData, setContributionData] = useState<ContributionFormInputs | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContributionFormInputs>({
    resolver: zodResolver(contributionSchema(minAmount)),
    defaultValues: {
      amount: minAmount,
    },
  });

  const onSubmit = async (data: ContributionFormInputs) => {
    setContributionData(data);
    setShowConfirmation(true);
  };

  const handleConfirmContribution = async () => {
    if (contributionData) {
      await onContribute(event._id, contributionData.amount);
      setShowConfirmation(false);
      onClose();
    }
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Contribuer à l'événement: {event.name}</h3>
        <p className="py-4">Montant minimal: {event.minimalAmount} XAF</p> {/* Changed text */}
        <form onSubmit={handleSubmit(onSubmit)} className="form-control gap-4">
          <div>
            <label className="label">
              <span className="label-text">Montant de la contribution (XAF)</span>
            </label>
            <input
              type="number"
              placeholder="Entrez le montant"
              className="input input-bordered w-full"
              {...register('amount', { valueAsNumber: true })}
            />
            {errors.amount && <p className="text-error text-sm mt-1">{errors.amount.message}</p>}
          </div>
          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Annuler</button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Traitement...' : 'Confirmer la contribution'}
            </button>
          </div>
        </form>
      </div>

      {showConfirmation && contributionData && (
        <ConfirmationModal
          message={`Confirmez-vous le paiement de ${contributionData.amount} XAF pour l'événement "${event.name}"?`}
          onConfirm={handleConfirmContribution}
          onCancel={handleCancelConfirmation}
        />
      )}
    </div>
  );
};

export default ContributeToEventModal;