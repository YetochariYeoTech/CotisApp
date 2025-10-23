import { Member } from "../entity/Member";

export const getUserJoinDate = async (userId: string): Promise<Date | null> => {
  try {
    const member = await Member.findById(userId);
    return member ? member.joinDate : null;
  } catch (error) {
    console.error("Error fetching user join date:", error);
    return null;
  }
};