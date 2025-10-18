import { Schema, model, Types } from "mongoose";
import { PaymentType, TransactionStatus, PaymentProvider } from "../types/enums";

const transactionSchema = new Schema({
  // The member associated with this transaction.
  member: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  // The monetary value of the transaction.
  amount: {
    type: Number,
    required: true,
  },
  // The category or type of the transaction (e.g., DUES, EVENT).
  type: {
    type: String,
    enum: Object.values(PaymentType),
    required: true,
  },
  // The current state of the transaction lifecycle.
  status: {
    type: String,
    enum: Object.values(TransactionStatus),
    default: TransactionStatus.PENDING,
  },
  // The date this transaction was initiated.
  date: {
    type: Date,
    default: Date.now,
  },
  // Optional: A user-facing description for the transaction.
  description: {
    type: String,
  },
  // The source of the payment (e.g., internal system or Wave).
  paymentProvider: {
    type: String,
    enum: Object.values(PaymentProvider),
    default: PaymentProvider.INTERNAL,
  },
  // The unique ID from the external payment provider (e.g., Wave).
  // Indexed for quick lookups, especially for webhooks.
  externalTransactionId: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple documents to have a null value for this field
    index: true,
  },
  // Optional: Link to a specific due payment.
  memberDueId: {
    type: Schema.Types.ObjectId,
    ref: "MemberDue",
  },
  // Optional: Link to a specific event.
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
});

export const Transaction = model("Transaction", transactionSchema);
