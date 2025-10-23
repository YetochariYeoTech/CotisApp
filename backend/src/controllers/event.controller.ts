import { Request, Response } from "express";
import { Event } from "../entity/Event";
import { Transaction } from "../entity/Transaction";
import { PaymentType } from "../types/enums";
import { getUserJoinDate } from "../utils/getUserJoinDate";

/**
 * @description Create a new event
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const createEvent = async (req: Request, res: Response) => {
  const { name, description, date, minimalAmount } = req.body;

  try {
    const event = new Event({ name, description, date, minimalAmount });
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * @description Contribute to an event
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const contributeToEvent = async (req: Request, res: Response) => {
  const { memberId, amount } = req.body;
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send("Event not found");
    }

    if (amount < event.minimalAmount) {
      return res
        .status(400)
        .send(`Contribution amount must be at least ${event.minimalAmount}`);
    }

    // Check for existing contribution from this member to this event
    const existingContribution = await Transaction.findOne({
      event: eventId,
      member: memberId,
      type: PaymentType.EVENT,
    });

    if (existingContribution) {
      return res.status(409).send("User has already contributed to this event.");
    }

    const transaction = new Transaction({
      member: memberId,
      amount,
      type: PaymentType.EVENT,
      event: eventId,
    });
    await transaction.save();

    res.status(200).send({ transaction });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getEvents = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const { userId } = req.user;

  try {
    const joinDate = await getUserJoinDate(userId);
    if (!joinDate) {
      return res
        .status(404)
        .send({ message: "User not found or join date is missing" });
    }

    const events = await Event.find({
      date: { $gte: joinDate },
    })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ date: -1 });

    console.log("Events found in DB:", events);

    const count = await Event.countDocuments({
      date: { $gte: joinDate },
    });

    res.json({
      events,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).send({ message: "Error fetching events", error });
  }
};
