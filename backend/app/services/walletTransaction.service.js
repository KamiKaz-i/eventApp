import * as walletTransactionRepository from "../repositories/walletTransaction.repository.js";
import db from "../config/db.config.js";
export const getTransactions = async (walletId) => {
  try {
    const walletId = req.params.id;
    const walletTransactions = await walletTransactionRepository(walletId);
    return walletTransactions;
  } catch (error) {
    throw error;
  }
};
