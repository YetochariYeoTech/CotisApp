import { Role, ContributionStatus, AccountStatus } from '../types/enums';

export interface Member {
  _id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: Role;
  contributionStatus: ContributionStatus;
  accountStatus: AccountStatus;
  joinDate: string;
}
