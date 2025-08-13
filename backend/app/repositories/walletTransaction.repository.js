import db from "../config/db.config.js";

let WalletTransaction = db.Wallet_transaction;
let Wallet = db.Wallet;
let Payment = db.Payment;
let Order = db.Order;
let Ticket = db.Ticket;
let OrderTicket = db.Order_ticket;
let Event = db.Event;
let User = db.User;

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
export const increment = async (walletId, therealamount, dbTransaction) => {
  await Wallet.increment(
    { balance: therealamount },
    {
      where: {
        id: walletId,
      },
      transaction: dbTransaction,
    }
  );
};
