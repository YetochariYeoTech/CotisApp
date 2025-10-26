import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { MemberDue } from '../../types/dues';
import ConfirmationModal from '../common/ConfirmationModal'; // Import the ConfirmationModal

interface PayDueModalProps {
  memberDue: MemberDue;
  onClose: () => void;
  onPay: (payload: { memberDueId: string; amount: number; memberId: string }) => Promise<void>;
}

const paymentSchema = (minAmount: number, maxAmount: number) => z.object({
  amount: z.number()
    .min(minAmount, { message: `Le montant ne peut pas être inférieur à ${minAmount} XAF` })
    .max(maxAmount, { message: `Le montant ne peut pas être supérieur à ${maxAmount} XAF` })
    .refine(val => val > 0, { message: "Le montant doit être positif" }),
});

type PaymentFormInputs = z.infer<ReturnType<typeof paymentSchema>>;

const PayDueModal: React.FC<PayDueModalProps> = ({ memberDue, onClose, onPay }) => {
  const remainingAmount = memberDue.dueId.expectedAmount - memberDue.paidAmount;
  const minAmount = 1; // Minimum payment is 1 XAF
  const maxAmount = remainingAmount; // Cannot pay more than remaining

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentFormInputs | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentSchema(minAmount, maxAmount)),
    defaultValues: {
      amount: remainingAmount,
    },
  });

  const onSubmit = async (data: PaymentFormInputs) => {
    setPaymentData(data);
    setShowConfirmation(true);
  };

  const handleConfirmPayment = async () => {
    if (paymentData) {
      await onPay({
        memberDueId: memberDue._id,
        amount: paymentData.amount,
        memberId: memberDue.memberId,
      });
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
        <h3 className="font-bold text-lg">Payer la cotisation: {memberDue.dueId.label}</h3>
        <p className="py-4">Montant restant: {remainingAmount} XAF</p>
        <form onSubmit={handleSubmit(onSubmit)} className="form-control gap-4">
          <div>
            <label className="label">
              <span className="label-text">Montant du paiement (XAF)</span>
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
              {isSubmitting ? 'Traitement...' : 'Confirmer le paiement'}
            </button>
          </div>
        </form>
      </div>

      {showConfirmation && paymentData && (
        <ConfirmationModal
          message={`Confirmez-vous le paiement de ${paymentData.amount} XAF pour la cotisation "${memberDue.dueId.label}"?`}
          onConfirm={handleConfirmPayment}
          onCancel={handleCancelConfirmation}
        />
      )}
    </div>
  );
};

export default PayDueModal;
