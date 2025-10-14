import { Request, Response } from 'express';
import { IMember, Member } from '../entity/Member';
import { Dues } from '../entity/Dues';
import { ContributionStatus } from '../types/enums';
import { IMemberPublic } from '../types/interfaces';
import { Types } from 'mongoose';

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
    return res.status(404).send('Member not found');
  }
  res.json(member);
};

/**
 * @description Get all members who are up to date with their dues
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const getMembersUpToDate = async (req: Request, res: Response) => {
  const members = await Member.find({ contributionStatus: ContributionStatus.UP_TO_DATE });

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
  const dues = await Dues.aggregate([
    {
      $match: { member: new Types.ObjectId(memberId) },
    },
    {
      $lookup: {
        from: 'transactions',
        localField: '_id',
        foreignField: 'dues',
        as: 'transactions',
      },
    },
  ]);

  res.json(dues);
};