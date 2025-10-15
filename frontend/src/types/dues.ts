import { DuesStatus } from './enums';

// Represents the abstract Due object
export interface Due {
  _id: string;
  label: string;
  period: string;
  expectedAmount: number;
  dueDate: string;
}

// Represents a member's specific obligation for a due, this is what the frontend will primarily use
export interface MemberDue {
  _id: string;
  dueId: Due; // Populated from the backend
  memberId: string;
  paidAmount: number;
  status: DuesStatus;
}

// Type for the form when creating a new Due for all members
export interface CreateDuePayload {
  label: string;
  period: string;
  expectedAmount: number;
  dueDate: string;
}

// Type for the payload when making a payment
export interface PayDuePayload {
  memberDueId: string;
  amount: number;
  memberId: string;
}