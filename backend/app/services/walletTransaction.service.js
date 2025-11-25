import * as walletTransactionRepository from "../repositories/walletTransaction.repository.js";
import * as walletRepository from "../repositories/wallet.repository.js";
import * as orderRepository from "../repositories/order.repository.js";
import * as orderTicketRepository from "../repositories/orderTicket.repository.js";
import * as paymentRepository from "../repositories/payment.reposistory.js";
import * as ticketRepository from "../repositories/ticket.repository.js";
import db from "../config/db.config.js";
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
    const transaction = {
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
    const transaction = {
      wallet_id: walletId,
      amount: amount,
      transaction_type: transactionType,
    };
    const currentBalance = await walletRepository.getWalletByPk(
      walletId,
      dbTransaction
    );
    const newBalance = parseFloat(currentBalance.dataValues.balance) - amount;
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
    const orderTickets = await orderTicketRepository.getOrderTicketWithUser(
      orderId,
      dbTransaction
    );
    if (orderTickets.length === 0) {
      throw new Error("orderTickets not found in order");
    }

    const sellerEarnings = {};
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
    const transaction = {
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

    const order = await orderRepository.getOneOrder(orderId);

    if (!order) {
      throw new Error("order doesnt exist");
    }
    if (order.status === "paid") {
      throw new Error("order already paid");
    }
    await paymentRepository.createPayment(
      {
        order_id: orderId,
        wallet_transaction_id: walletTransanction.id,
        method: "wallet",
        status: "paid",
      },
      dbTransaction
    );
    order.status = "paid";
    await order.save({ transaction: dbTransaction });
    await ticketRepository.updateTicketQuantityAvaiable(orderId, dbTransaction);
    await dbTransaction.commit();
  } catch (error) {
    if (dbTransaction) await dbTransaction.rollback();
    throw error;
  }
};
export const returnTicket = async (userId, ticketId, returnTicketQuantity) => {
  let dbTransaction;
  try {
    dbTransaction = await db.sequelize.transaction();

    const orders = await orderRepository.getPaidOrder(userId);

    let allMatches = [];
    let totalOwned = 0;

    for (const order of orders) {
      if (order.Order_tickets) {
        const matches = order.Order_tickets.filter(
          (ot) => ot.ticket_id === parseInt(ticketId)
        );

        for (const match of matches) {
          match.parentOrder = order;
          allMatches.push(match);
          totalOwned += match.quantity;
        }
      }
    }

    if (totalOwned < returnTicketQuantity) {
      throw new Error(
        `You cannot return ${returnTicketQuantity} tickets. You only own ${totalOwned} in total.`
      );
    }
    const ticketDetails = await ticketRepository.getTicket(ticketId);
    const sellerId = ticketDetails.Event.organizer_id;

    const sellerWallet = await walletRepository.getWallet(sellerId);
    const userWallet = await walletRepository.getWallet(userId);

    if (!sellerWallet) throw new Error("Seller wallet not found");
    if (!userWallet) throw new Error("User wallet not found");

    let remainingToReturn = returnTicketQuantity;
    for (const targetOrderTicket of allMatches) {
      if (remainingToReturn <= 0) break;
      const canTake = Math.min(targetOrderTicket.quantity, remainingToReturn);
      const unitPrice =
        parseFloat(targetOrderTicket.subtotal_price) /
        targetOrderTicket.quantity;
      const refundChunk = unitPrice * canTake;
      await walletTransactionRepository.createTransaction(
        {
          wallet_id: sellerWallet.id,
          amount: refundChunk,
          transaction_type: "withdraw",
        },
        dbTransaction
      );
      await walletRepository.increment(
        sellerWallet.id,
        -refundChunk,
        dbTransaction
      );
      await walletTransactionRepository.createTransaction(
        {
          wallet_id: userWallet.id,
          amount: refundChunk,
          transaction_type: "deposit",
        },
        dbTransaction
      );
      await walletRepository.increment(
        userWallet.id,
        refundChunk,
        dbTransaction
      );
      if (targetOrderTicket.quantity > canTake) {
        const newQuantity = targetOrderTicket.quantity - canTake;
        const newSubtotal =
          parseFloat(targetOrderTicket.subtotal_price) - refundChunk;

        await targetOrderTicket.update(
          { quantity: newQuantity, subtotal_price: newSubtotal },
          { transaction: dbTransaction }
        );
      } else {
        await targetOrderTicket.destroy({ transaction: dbTransaction });
      }
      await targetOrderTicket.parentOrder.increment(
        { total_price: -refundChunk },
        { transaction: dbTransaction }
      );

      remainingToReturn -= canTake;
    }
    const ticketModel = await ticketRepository.getTicket(ticketId);
    await ticketModel.increment(
      { quantity_available: returnTicketQuantity },
      { transaction: dbTransaction }
    );
    await dbTransaction.commit();
    return {
      message: `Successfully returned ${returnTicketQuantity} tickets`,
    };
  } catch (error) {
    if (dbTransaction) await dbTransaction.rollback();
    throw error;
  }
};
