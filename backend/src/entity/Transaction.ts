import { Schema, model, Types } from 'mongoose';
import { PaymentType, TransactionStatus } from '../types/enums';

const transactionSchema = new Schema({
  member: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(PaymentType),
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(TransactionStatus),
    default: TransactionStatus.PENDING,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  dues: {
    type: Schema.Types.ObjectId,
    ref: 'Dues',
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },
});

export const Transaction = model('Transaction', transactionSchema);
