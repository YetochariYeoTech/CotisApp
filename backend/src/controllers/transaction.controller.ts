import { Request, Response } from 'express';
import { Transaction } from '../entity/Transaction';
import { TransactionStatus } from '../types/enums';

export const validateTransaction = async (req: Request, res: Response) => {
  const transactionId = req.params.id;

  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).send('Transaction not found');
    }

    transaction.status = TransactionStatus.VALIDATED;
    await transaction.save();

    res.status(200).send(transaction);
  } catch (error) {
    res.status(500).send(error);
  }
};
