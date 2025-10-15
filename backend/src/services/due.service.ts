import { Member } from '../entity/Member';
import { Due } from '../entity/Due';
import { MemberDue } from '../entity/MemberDue';
import { ContributionStatus, DuesStatus } from '../types/enums';

class DueService {
  public async createDue(dueDetails: {
    label: string;
    period: string;
    expectedAmount: number;
    dueDate: Date;
  }) {
    const { label, period, expectedAmount, dueDate } = dueDetails;

    // 1. Check if a due with the same label and period already exists
    const existingDue = await Due.findOne({ label, period });
    if (existingDue) {
      throw new Error(`A due with label '${label}' for period '${period}' already exists.`);
    }

    // 2. Create the single, abstract Due
    const newDue = new Due({ label, period, expectedAmount, dueDate });
    await newDue.save();

    // 3. Get all members
    const members = await Member.find();

    // 4. Create a specific MemberDue obligation for each member
    const memberDuePromises = members.map(member => {
      const memberDue = new MemberDue({
        dueId: newDue._id,
        memberId: member._id,
        status: DuesStatus.UNPAID,
        paidAmount: 0,
      });
      return memberDue.save();
    });

    await Promise.all(memberDuePromises);

    return newDue;
  }

  public async isMemberUpToDate(memberId: string): Promise<boolean> {
    const memberDues = await MemberDue.find({ memberId }).populate('dueId');
    const today = new Date();

    for (const memberDue of memberDues) {
      const due = memberDue.dueId as any; // Cast to access Due properties
      if (due.dueDate < today && memberDue.status !== DuesStatus.PAID) {
        await Member.findByIdAndUpdate(memberId, { contributionStatus: ContributionStatus.LATE });
        return false;
      }
    }

    await Member.findByIdAndUpdate(memberId, { contributionStatus: ContributionStatus.UP_TO_DATE });
    return true;
  }
}

export const dueService = new DueService();