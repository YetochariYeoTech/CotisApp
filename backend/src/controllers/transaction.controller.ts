import { Request, Response } from 'express';
import { Transaction } from '../entity/Transaction';
import { TransactionStatus } from '../types/enums';

/**
 * @description Get all transactions
 */
export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * @description Get all transactions for a specific member
 */
export const getTransactionsByMember = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;
    const transactions = await Transaction.find({ member: memberId }).sort({ date: -1 });
    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
};


/**
 * @description Validate a transaction
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
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