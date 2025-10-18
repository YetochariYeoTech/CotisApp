// This file will contain all the controller logic for handling incoming webhooks from third-party services like Wave.

import { Request, Response } from "express";
import crypto from "crypto";
import { config } from "../config";
import { Transaction } from "../entity/Transaction";
import { TransactionStatus } from "../types/enums";

/**
 * Verifies the HMAC signature of the webhook request from Wave.
 * @param req The Express request object.
 * @returns {boolean} True if the signature is valid, false otherwise.
 */
const verifyWaveSignature = (req: Request): boolean => {
  // Retrieve the signature from the request headers.
  const signature = req.get('X-Wave-Signature');
  if (!signature) {
    return false;
  }

  // Create a HMAC hash using the SHA256 algorithm and the webhook secret.
  const hmac = crypto.createHmac('sha256', config.wave.webhookSecret);
  // Update the hash with the raw request body.
  hmac.update(req.body);
  // Calculate the expected signature.
  const expectedSignature = hmac.digest('hex');

  // Compare the signatures in a way that prevents timing attacks.
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
};

/**
 * Handles incoming webhook notifications from Wave.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const handleWaveWebhook = async (req: Request, res: Response) => {
  // 1. Verify the webhook signature. CRITICAL for security.
  // Note: This requires the raw request body, so we must ensure the body parser
  // middleware provides it. Express's default json parser does.
  if (!verifyWaveSignature(req)) {
    console.warn("Invalid Wave webhook signature received.");
    return res.status(400).send("Invalid signature.");
  }

  // 2. Extract relevant data from the webhook payload.
  // The structure of this payload is a MOCK based on the guide.
  const { client_reference, wave_transaction_id, status } = req.body;

  // 3. Find the transaction in our database using the reference ID.
  const transaction = await Transaction.findById(client_reference);

  if (!transaction) {
    console.warn(`Webhook received for unknown transaction reference: ${client_reference}`);
    // Return 200 to acknowledge receipt and prevent Wave from retrying.
    return res.status(200).send("Transaction not found, but webhook acknowledged.");
  }

  // 4. Idempotency Check: Ensure we haven't already processed this.
  if (transaction.status === TransactionStatus.VALIDATED) {
    console.log(`Webhook for already validated transaction received: ${client_reference}`);
    return res.status(200).send("Webhook acknowledged.");
  }

  // 5. Update the transaction status based on the webhook content.
  try {
    if (status === 'SUCCESS') {
      transaction.status = TransactionStatus.VALIDATED;
      transaction.externalTransactionId = wave_transaction_id; // Ensure external ID is stored.
      console.log(`Transaction ${transaction._id} validated successfully.`);
    } else {
      transaction.status = TransactionStatus.CANCELLED;
      console.log(`Transaction ${transaction._id} marked as cancelled.`);
    }
    await transaction.save();

    // 6. Acknowledge the webhook.
    res.status(200).send("Webhook processed successfully.");

  } catch (error) {
    console.error(`Error processing webhook for transaction ${transaction._id}:`, error);
    // Send a 500 error to signal to Wave that something went wrong on our end.
    res.status(500).send("Internal server error while processing webhook.");
  }
};
