import { Request, Response } from "express";
import { IMember, Member } from "../entity/Member";
import { Due } from "../entity/Due";
import { Transaction } from "../entity/Transaction";
import { TransactionStatus, ContributionStatus } from "../types/enums";

/**
 * @description Get the current member's balance
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const getMemberBalance = async (req: Request, res: Response) => {
  const { userId } = req.user;

  try {
    const result = await Transaction.aggregate([
      {
        $match: {
          member: new Types.ObjectId(userId),
          status: TransactionStatus.VALIDATED,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const balance = result.length > 0 ? result[0].total : 0;
    res.json({ balance });
  } catch (error) {
    res.status(500).send({ message: "Error fetching member balance", error });
  }
};
import { IMemberPublic } from "../types/interfaces";
import { Types } from "mongoose";

/**
 * @description Get all members
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const getMembers = async (req: Request, res: Response) => {
  const members = await Member.find();
  res.json(members);
};

/**
 * @description Get a member by ID
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const getMemberById = async (req: Request, res: Response) => {
  const member = await Member.findById(req.params.id);
  if (!member) {
    return res.status(404).send("Member not found");
  }
  res.json(member);
};

/**
 * @description Get all members who are up to date with their dues
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const getMembersUpToDate = async (req: Request, res: Response) => {
  const members = await Member.find({
    contributionStatus: ContributionStatus.UP_TO_DATE,
  });

  const publicMembers: IMemberPublic[] = members.map((member: IMember) => ({
    _id: (member as any)._id.toString(),
    fullName: member.fullName,
    email: member.email,
    role: member.role,
    joinDate: member.joinDate,
  }));

  res.json(publicMembers);
};

/**
 * @description Get a member's dues report
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const getMemberDuesReport = async (req: Request, res: Response) => {
  const memberId = req.params.id;
  const dues = await Due.aggregate([
    {
      $match: { member: new Types.ObjectId(memberId) },
    },
    {
      $lookup: {
        from: "transactions",
        localField: "_id",
        foreignField: "dues",
        as: "transactions",
      },
    },
  ]);

  res.json(dues);
};
