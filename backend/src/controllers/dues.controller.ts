import { Request, Response } from "express";
import { duesService } from "../services/dues.service";
import { Transaction } from "../entity/Transaction";
import { Dues } from "../entity/Dues";
import { PaymentType, DuesStatus } from "../types/enums";

/**
 * @description Generate dues for all members
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const generateDues = async (req: Request, res: Response) => {
  try {
    await duesService.generateDues();
    res.status(200).send("Dues generated successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * @description Pay dues for a member
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const payDues = async (req: Request, res: Response) => {
  const { memberId, duesId, amount } = req.body;

  try {
    const dues = await Dues.findById(duesId);
    if (!dues) {
      return res.status(404).send("Dues not found");
    }

    const transaction = new Transaction({
      member: memberId,
      amount,
      type: PaymentType.DUES,
      dues: duesId,
    });
    await transaction.save();

    dues.paidAmount += amount;
    if (dues.paidAmount >= dues.expectedAmount) {
      dues.status = DuesStatus.PAID;
    } else {
      dues.status = DuesStatus.PARTIALLY_PAID;
    }
    await dues.save();

    res.status(200).send({ transaction, dues });
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * @description Get total dues by member
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const getTotalDuesByMember = async (req: Request, res: Response) => {
  try {
    const result = await Dues.aggregate([
      {
        $group: {
          _id: "$member",
          totalDues: { $sum: "$expectedAmount" },
          totalPaid: { $sum: "$paidAmount" },
        },
      },
      {
        $lookup: {
          from: "members",
          localField: "_id",
          foreignField: "_id",
          as: "member",
        },
      },
      {
        $unwind: "$member",
      },
      {
        $project: {
          _id: 0,
          member: {
            _id: "$member._id",
            firstName: "$member.firstName",
            lastName: "$member.lastName",
          },
          totalDues: 1,
          totalPaid: 1,
          balance: { $subtract: ["$totalDues", "$totalPaid"] },
        },
      },
    ]);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
