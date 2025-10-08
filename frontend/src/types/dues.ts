import { DuesStatus } from '../types/enums';

export interface Dues {
  _id: string;
  member: string;
  period: string;
  expectedAmount: number;
  paidAmount: number;
  dueDate: string;
  status: DuesStatus;
}
