import { Request, Response } from "express";
import { Member } from "../entity/Member";
import { Transaction } from "../entity/Transaction";
import * as jwt from "jsonwebtoken";
import { config } from "../config";
import { startSession } from "mongoose";
import { PaymentType } from "../types/enums";

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
