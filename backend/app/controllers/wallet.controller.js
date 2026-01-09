import * as walletService from "../services/wallet.service.js";
import { RunInTransaction } from "../utils/transaction.js";
export const getWallet = async (req, res) => {
  try {
    const wallet = await walletService.getWallet(req.user.id);
    res.status(200).json({
      id: wallet.id,
      balance: wallet.balance,
      pendingBalance: wallet.pending_balance,
      updatedAt: wallet.updatedAt,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message,
    });
  }
};
export const releasePendingFunds = async (req, res) => {
  try {
    const result = await RunInTransaction(async (transaction) => {
      return await walletService.releasePendingFunds(transaction);
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message,
    });
  }
};
