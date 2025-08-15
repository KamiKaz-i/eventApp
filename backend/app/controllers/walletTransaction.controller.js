import * as walletTransactionService from "../services/walletTransaction.service.js";
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
  const walletId = req.body.walletId;
  const transactionType = req.body.transactionType;
  const amount = parseFloat(req.body.amount) || null;
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
    const walletId = req.body.walletId;
    const transactionType = req.body.transactionType;
    const orderId = req.body.orderId;

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
