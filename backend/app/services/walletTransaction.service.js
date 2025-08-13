import * as walletTransactionRepository from "../repositories/walletTransaction.repository.js";
import * as walletRepository from "../repositories/wallet.repository.js";
import db from "../config/db.config.js";
import * as orderRepository from "../repositories/order.repository.js";
import * as orderTicketRepository from "../repositories/orderTicket.repository.js";
import * as paymentRepository from "../repositories/payment.reposistory.js";
import * as ticketRepository from "../repositories/ticket.repository.js";
export const getTransactions = async (walletId) => {
  try {
    const walletTransactions =
      await walletTransactionRepository.getWalletTransactions(walletId);
    return walletTransactions;
  } catch (error) {
    throw error;
  }
};
export const deposit = async (walletId, amount, transactionType) => {
  try {
    const dbTransaction = await db.sequelize.transaction();
    let transaction = {
      wallet_id: walletId,
      amount: amount,
      transaction_type: transactionType,
    };
    await walletTransactionRepository.createTransaction(
      transaction,
      dbTransaction
    );
    await walletRepository.increment(walletId, amount, dbTransaction);
    const updatedWallet = await walletRepository.getWalletByPk(
      walletId,
      dbTransaction
    );
    await dbTransaction.commit();
    return updatedWallet;
  } catch (error) {
    throw error;
  }
};
export const withdraw = async (walletId, amount, transactionType) => {
  try {
    const dbTransaction = await db.sequelize.transaction();
    let transaction = {
      wallet_id: walletId,
      amount: amount,
      transaction_type: transactionType,
    };
    const currentBalance = await walletRepository.getWalletByPk(
      walletId,
      dbTransaction
    );
    let newBalance = parseFloat(currentBalance.dataValues.balance) - amount;
    if (newBalance < 0) {
      await dbTransaction.rollback();
      throw new Error("insufficient funds");
    }
    await walletTransactionRepository.createTransaction(
      transaction,
      dbTransaction
    );
    await walletRepository.increment(walletId, -amount, dbTransaction);
    const updatedWallet = await walletRepository.getWalletByPk(
      walletId,
      dbTransaction
    );
    await dbTransaction.commit();
    return updatedWallet;
  } catch (error) {
    throw error;
  }
};

export const purchase = async (walletId, transactionType, orderId) => {
  try {
    const dbTransaction = await db.sequelize.transaction();
    const orderTickets = await orderTicketRepository.getOrderTicket({
      where: {
        order_id: orderId,
      },
      include: [
        {
          model: db.Ticket,
          include: [
            {
              model: db.Event,
              include: [
                {
                  model: db.User,
                  include: [
                    {
                      model: db.Wallet,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      transaction: dbTransaction,
    });
    if (orderTickets.length === 0) {
      throw new Error("orderTickets not found in order");
    }

    let sellerEarnings = {};
    let totalPrice = 0;

    for (let orderTicket of orderTickets) {
      sellerEarnings[orderTicket.Ticket.Event.User.Wallet.id] =
        (parseFloat(sellerEarnings[orderTicket.Ticket.Event.User.Wallet.id]) ||
          0) + parseFloat(orderTicket.subtotal_price);
      totalPrice += parseFloat(orderTicket.subtotal_price);
    }
    const currentBalance = await walletRepository.getWalletByPk(
      walletId,
      dbTransaction
    );
    let currBalanceParsed = parseFloat(currentBalance.dataValues.balance);
    let newBalance = (currBalanceParsed - totalPrice).toFixed(2);

    let newBalanceParsed = parseFloat(newBalance);
    if (newBalanceParsed < 0) {
      await dbTransaction.rollback();
      throw new Error("Insufficient funds");
    }
    let transaction = {
      wallet_id: walletId,
      amount: totalPrice,
      transaction_type: transactionType,
    };
    const walletTransanction =
      await walletTransactionRepository.createTransaction(
        transaction,
        dbTransaction
      );
    await walletRepository.increment(walletId, -totalPrice, dbTransaction);
    for (const [sellerWalletId, amount] of Object.entries(sellerEarnings)) {
      await walletTransactionRepository.createTransaction(
        {
          wallet_id: sellerWalletId,
          amount,
          transaction_type: "sell",
        },
        dbTransaction
      );
      await walletRepository.increment(sellerWalletId, amount, dbTransaction);
    }
    console.log(orderId);

    const order = await orderRepository.getOneOrder({
      id: orderId,
    });

    console.log(order);

    if (!order) {
      throw new Error("order doesnt exist");
    }
    if (order.status === "paid") {
      throw new Error("order already paid");
    }

    await paymentRepository.createPayment({
      order_id: orderId,
      wallet_transaction_id: walletTransanction.id,
      method: "wallet",
      status: "paid",
      transaction: dbTransaction,
    });
    order.status = "paid";
    await order.save();
    await ticketRepository.updateTicketQuantityAvaiable(orderId);
    await dbTransaction.commit();
  } catch (error) {
    throw error;
  }
};
