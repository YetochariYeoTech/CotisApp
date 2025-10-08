import { Role, DuesStatus } from './enums';

export interface IMemberPublic {
  _id: any;
  fullName: string;
  email: string;
  role: Role;
  joinDate: Date;
}

export interface IDuesReportItem {
  period: string;
  expectedAmount: number;
  paidAmount: number;
  dueDate: Date;
  status: DuesStatus;
}
