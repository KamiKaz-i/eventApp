import db from "../config/db.config.js";

let WalletTransaction = db.Wallet_transaction;

export const getWalletTransactions = async (walletId) => {
  const walletTransactions = await WalletTransaction.findAll({
    where: {
      wallet_id: walletId,
    },
  });
  return walletTransactions;
};
export const createTransaction = async (transaction, dbTransaction) => {
  const walletTransaction = await WalletTransaction.create(transaction, {
    transaction: dbTransaction,
  });
  return walletTransaction;
};
