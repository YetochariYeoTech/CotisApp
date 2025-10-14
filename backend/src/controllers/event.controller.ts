import { Request, Response } from 'express';
import { Event } from '../entity/Event';
import { Transaction } from '../entity/Transaction';
import { PaymentType } from '../types/enums';

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
      return res.status(404).send('Event not found');
    }

    if (amount < event.minimalAmount) {
      return res.status(400).send(`Contribution amount must be at least ${event.minimalAmount}`);
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