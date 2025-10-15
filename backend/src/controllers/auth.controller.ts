import { Request, Response } from "express";
import { Member } from "../entity/Member";
import { Transaction } from "../entity/Transaction";
import * as jwt from "jsonwebtoken";
import { config } from "../config";
import { startSession } from "mongoose";
import { PaymentType, AccountStatus } from "../types/enums";

/**
 * @description Register a new member
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const register = async (req: Request, res: Response) => {
  const { email, password, fullName, phoneNumber } = req.body;

  const session = await startSession();
  session.startTransaction();

  try {
    const member = new Member({ email, password, fullName, phoneNumber });
    await member.save({ session });

    const transaction = new Transaction({
      member: member._id,
      amount: 10000, // Adhesion fee
      type: PaymentType.ADHESION,
    });
    await transaction.save({ session });

    await session.commitTransaction();
    session.endSession();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...memberData } = member.toObject();
    res.status(201).send({ member: memberData });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    res.status(400).send(error);
  }
};

/**
 * @description Login a member
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).send();
  }

  const member = await Member.findOne({ email }).select("+password");

  if (!member) {
    return res.status(401).send();
  }

  const isPasswordMatch = await member.comparePassword(password);

  if (!isPasswordMatch) {
    return res.status(401).send();
  }

  const token = jwt.sign(
    { userId: member._id, email: member.email, role: member.role },
    config.jwtSecret,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, { httpOnly: true });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...memberData } = member.toObject();
  res.send({ member: memberData });
};

/**
 * @description Activate a member's account by paying the activation fee
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const activateAccount = async (req: Request, res: Response) => {
  const { userId } = req.user; // From checkJwt middleware
  const { amount } = req.body;

  if (Number(amount) !== Number(config.activationFee)) {
    return res.status(400).send({ message: `Activation fee of ${config.activationFee} is required.` });
  }

  const session = await startSession();
  session.startTransaction();

  try {
    const member = await Member.findById(userId).session(session);
    if (!member) {
      throw new Error("Member not found.");
    }

    if (member.accountStatus === AccountStatus.ACTIVE) {
      throw new Error("Account is already active.");
    }

    // 1. Create the activation transaction
    const transaction = new Transaction({
      member: member._id,
      amount: Number(amount),
      type: PaymentType.ACTIVATION,
    });
    await transaction.save({ session });

    // 2. Update member status
    member.accountStatus = AccountStatus.ACTIVE;
    await member.save({ session });

    await session.commitTransaction();
    res.status(200).send({ message: "Account activated successfully.", member });

  } catch (error: any) {
    await session.abortTransaction();
    res.status(500).send({ message: "Account activation failed.", error: error.message });

  } finally {
    session.endSession();
  }
};
