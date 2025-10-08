import { PaymentType, TransactionStatus } from '../types/enums';

export interface Transaction {
  _id: string;
  member: string;
  amount: number;
  type: PaymentType;
  status: TransactionStatus;
  date: string;
  dues?: string;
  event?: string;
}
