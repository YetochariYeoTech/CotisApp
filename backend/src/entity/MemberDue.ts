import { Schema, model } from "mongoose";
import { DuesStatus } from "../types/enums";

const memberDueSchema = new Schema({
  dueId: {
    type: Schema.Types.ObjectId,
    ref: "Due",
    required: true,
  },
  memberId: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  paidAmount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: Object.values(DuesStatus),
    default: DuesStatus.UNPAID,
  },
});

export const MemberDue = model("MemberDue", memberDueSchema);
