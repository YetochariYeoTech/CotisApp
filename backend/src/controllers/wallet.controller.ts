// This file will contain all the controller logic for wallet-related operations,
// including creating top-up requests and handling payment provider interactions.

import { Request, Response } from "express";
import { Transaction } from "../entity/Transaction";
import { config } from "../config";
import { PaymentProvider, PaymentType, TransactionStatus } from "../types/enums";
import axios from "axios";

/**
 * Creates a top-up request by generating a Wave payment checkout URL.
 * @param {Request} req - Express request object, expects { amount: number } in the body.
 * @param {Response} res - Express response object.
 */
export const createTopUpRequest = async (req: Request, res: Response) => {
  const { amount } = req.body;
  const { userId } = req.user; // Assuming userId is available from checkJwt middleware

  // 1. Input Validation
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).send({ message: "A valid positive amount is required." });
  }

  let pendingTransaction;

  try {
    // 2. Create a PENDING transaction in our database
    pendingTransaction = new Transaction({
      member: userId,
      amount,
      type: PaymentType.DUES, // Or a new 'TOP_UP' type if you add it
      status: TransactionStatus.PENDING,
      paymentProvider: PaymentProvider.WAVE,
      description: `Top-up of ${amount}`,
    });
    await pendingTransaction.save();

    // 3. Make a server-to-server call to Wave to create a checkout session
    // THIS IS A MOCK IMPLEMENTATION based on the guide.
    // The actual Wave API will have a different structure.
    const waveApiUrl = `${config.wave.apiUrl}/checkout/sessions`;
    const wavePayload = {
      amount: amount,
      currency: 'XOF', // Assuming West African CFA franc
      // The ID of our pending transaction is used to link the webhook notification back to our system.
      client_reference: pendingTransaction._id.toString(),
      // The URL Wave will redirect the user to after payment completion.
      success_url: 'http://localhost:5173/wallet?payment=success',
      // The URL Wave will redirect the user to if payment fails or is cancelled.
      failure_url: 'http://localhost:5173/wallet?payment=failed',
    };

    const waveResponse = await axios.post(waveApiUrl, wavePayload, {
      headers: {
        'Authorization': `Bearer ${config.wave.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const checkoutUrl = waveResponse.data.checkout_url;
    
    // Also save the external ID from Wave to our transaction for webhook handling.
    pendingTransaction.externalTransactionId = waveResponse.data.wave_transaction_id;
    await pendingTransaction.save();

    // 4. Return the checkout URL to the frontend
    return res.status(200).send({ checkoutUrl });

  } catch (error) {
    // If an error occurs, especially during the API call to Wave, we should mark our transaction as cancelled.
    if (pendingTransaction) {
      pendingTransaction.status = TransactionStatus.CANCELLED;
      await pendingTransaction.save();
    }

    console.error("Error creating top-up request:", error);
    // Avoid sending detailed error info to the client.
    return res.status(500).send({ message: "An error occurred while creating the payment request." });
  }
};
