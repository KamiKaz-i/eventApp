import db from "../config/db.config.js";
import * as walletTransactionService from "../services/walletTransaction.service.js";
// let WalletTransaction = db.Wallet_transaction;
// let Wallet = db.Wallet;
// let Payment = db.Payment;
// let Order = db.Order;
// let Ticket = db.Ticket;
// let OrderTicket = db.Order_ticket;
// let Event = db.Event;
// let User = db.User;
export const getTransactions = async (req, res) => {
  try {
    const walletId = req.params.id;
    const walletTransactions = await walletTransactionService.getTransactions(
      walletId
    );

    res.status(200).json(walletTransactions);
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message,
    });
  }
};

export const postWithdraw = async (req, res) => {
  let walletId = req.body.walletId;
  let transactionType = req.body.transactionType;
  let amount = parseFloat(req.body.amount) || null;
  const updatedWallet = await walletTransactionService.withdraw(
    walletId,
    amount,
    transactionType
  );
  res.status(200).json({
    wallet: updatedWallet.dataValues,
  });
};
export const postDeposit = async (req, res) => {
  let walletId = req.body.walletId;
  let transactionType = req.body.transactionType;
  let amount = parseFloat(req.body.amount) || null;
  const updatedWallet = await walletTransactionService.deposit(
    walletId,
    amount,
    transactionType
  );
  res.status(200).json({
    wallet: updatedWallet.dataValues,
  });
};
export const postTransaction = async (req, res) => {
  try {
    let walletId = req.body.walletId;
    let transactionType = req.body.transactionType;
    let orderId = req.body.orderId;

    const orderTickets = await walletTransactionService.purchase(
      walletId,
      transactionType,
      orderId
    );

    res.status(200).json(orderTickets);
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message,
    });
  }
};
