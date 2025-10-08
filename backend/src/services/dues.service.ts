import { Member } from '../entity/Member';
import { Dues } from '../entity/Dues';
import { ContributionStatus, DuesStatus } from '../types/enums';

class DuesService {
  public async generateDues() {
    const members = await Member.find({ contributionStatus: ContributionStatus.UP_TO_DATE });

    for (const member of members) {
      // Check if dues for the current quarter are already generated
      const today = new Date();
      const quarter = Math.floor((today.getMonth() + 3) / 3);
      const year = today.getFullYear();
      const period = `Q${quarter} ${year}`;

      const existingDues = await Dues.findOne({ member: member._id, period });

      if (!existingDues) {
        const dues = new Dues({
          member: member._id,
          period,
          expectedAmount: 30000, // Quarterly dues amount
          dueDate: new Date(year, quarter * 3, 0),
        });
        await dues.save();
      }
    }
  }

  public async isMemberUpToDate(memberId: string): Promise<boolean> {
    const dues = await Dues.find({ member: memberId });
    const today = new Date();

    for (const d of dues) {
      if (d.dueDate < today && d.status !== DuesStatus.PAID) {
        await Member.findByIdAndUpdate(memberId, { contributionStatus: ContributionStatus.LATE });
        return false;
      }
    }

    await Member.findByIdAndUpdate(memberId, { contributionStatus: ContributionStatus.UP_TO_DATE });
    return true;
  }
}

export const duesService = new DuesService();
