import { Schema, model, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { Role, ContributionStatus, AccountStatus } from '../types/enums';

export interface IMember extends Document {
  email: string;
  fullName: string;
  phoneNumber: string;
  role: Role;
  contributionStatus: ContributionStatus;
  accountStatus: AccountStatus;
  password: string;
  joinDate: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const memberSchema = new Schema<IMember>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: Object.values(Role),
    default: Role.MEMBER,
  },
  contributionStatus: {
    type: String,
    enum: Object.values(ContributionStatus),
    default: ContributionStatus.UP_TO_DATE,
  },
  accountStatus: {
    type: String,
    enum: Object.values(AccountStatus),
    default: AccountStatus.INACTIVE,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
});

memberSchema.pre<IMember>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

memberSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const Member: Model<IMember> = model<IMember>('Member', memberSchema);