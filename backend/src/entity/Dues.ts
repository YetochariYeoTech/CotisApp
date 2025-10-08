import { Schema, model } from 'mongoose';
import { DuesStatus } from '../types/enums';

const duesSchema = new Schema({
  member: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  expectedAmount: {
    type: Number,
    required: true,
  },
  paidAmount: {
    type: Number,
    default: 0,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(DuesStatus),
    default: DuesStatus.UNPAID,
  },
});

export const Dues = model('Dues', duesSchema);
