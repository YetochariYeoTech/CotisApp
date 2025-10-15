import { Request, Response } from "express";
import { startSession } from "mongoose";
import { dueService } from "../services/due.service";
import { MemberDue } from "../entity/MemberDue";
import { Due } from "../entity/Due";
import { Transaction } from "../entity/Transaction";
import { DuesStatus, PaymentType } from "../types/enums";

/**
 * @description Create a new Due abstract and generate MemberDue obligations for all members
 */
export const createDue = async (req: Request, res: Response) => {
  try {
    const { label, period, expectedAmount, dueDate } = req.body;
    if (!label || !period || !expectedAmount || !dueDate) {
      return res.status(400).send({ message: "Missing required fields." });
    }

    const newDue = await dueService.createDue({ label, period, expectedAmount, dueDate });
    res.status(201).send({ message: "Due created and assigned to all members successfully.", due: newDue });
  } catch (error: any) {
    res.status(500).send({ message: "Error creating due.", error: error.message });
  }
};

/**
 * @description Pay a due for a member. Creates a transaction and updates the member's due status.
 * This operation is atomic.
 */
export const payDue = async (req: Request, res: Response) => {
  const { memberDueId, amount, memberId } = req.body;
  if (!memberDueId || !amount || !memberId) {
    return res.status(400).send({ message: "Missing required fields: memberDueId, amount, memberId" });
  }

  const session = await startSession();
  session.startTransaction();

  try {
    const memberDue = await MemberDue.findById(memberDueId).session(session).populate('dueId');
    if (!memberDue) {
      throw new Error("MemberDue not found.");
    }

    const due = memberDue.dueId as any;
    if (!due) {
      throw new Error("Associated Due not found.");
    }

    if (memberDue.status === DuesStatus.PAID) {
      throw new Error("This due is already fully paid.");
    }

    const remainingAmount = due.expectedAmount - memberDue.paidAmount;
    if (amount > remainingAmount) {
      throw new Error(`Payment amount ($${amount}) exceeds remaining balance ($${remainingAmount}).`);
    }

    // 1. Create the transaction record
    const transaction = new Transaction({
      member: memberId,
      amount,
      type: PaymentType.DUES,
      memberDueId: memberDueId,
    });
    await transaction.save({ session });

    // 2. Update the MemberDue status
    memberDue.paidAmount += amount;
    if (memberDue.paidAmount >= due.expectedAmount) {
      memberDue.status = DuesStatus.PAID;
    } else {
      memberDue.status = DuesStatus.PARTIALLY_PAID;
    }
    await memberDue.save({ session });

    await session.commitTransaction();
    res.status(200).send({ message: "Payment successful.", transaction, memberDue });

  } catch (error: any) {
    await session.abortTransaction();
    res.status(500).send({ message: "Payment failed.", error: error.message });

  } finally {
    session.endSession();
  }
};

/**
 * @description Get all due obligations for a specific member
 */
export const getMemberDues = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;
    const memberDues = await MemberDue.find({ memberId }).populate('dueId');
    res.status(200).send(memberDues);
  } catch (error: any) {
    res.status(500).send({ message: "Error fetching member dues.", error: error.message });
  }
};

/**
 * @description Get a single MemberDue by its ID
 */
export const getMemberDueById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const memberDue = await MemberDue.findById(id).populate('dueId');
    if (!memberDue) {
      return res.status(404).send({ message: "MemberDue not found." });
    }
    res.status(200).send(memberDue);
  } catch (error: any) {
    res.status(500).send({ message: "Error fetching member due.", error: error.message });
  }
};