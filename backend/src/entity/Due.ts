import { Schema, model } from 'mongoose';

const dueSchema = new Schema({
  label: {
    type: String,
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
  dueDate: {
    type: Date,
    required: true,
  },
});

export const Due = model('Due', dueSchema);
