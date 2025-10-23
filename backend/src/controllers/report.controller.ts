import { Request, Response } from "express";
import { Transaction } from "../entity/Transaction";

/**
 * @description Get financial summary
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const getFinancialSummary = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  try {
    const summary = await Transaction.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(startDate as string),
            $lte: new Date(endDate as string),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).send(summary);
  } catch (error) {
    res.status(500).send(error);
  }
};
