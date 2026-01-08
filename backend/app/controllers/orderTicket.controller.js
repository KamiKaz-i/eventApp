import * as orderTicketService from "../services/orderTicket.service.js";
import * as walletTransactionService from "../services/walletTransaction.service.js";
import { RunInTransaction } from "../utils/transaction.js";
export const get = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await orderTicketService.getOrderTicket(userId);

    res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: "Order not found" });
  }
};
export const remove = async (req, res) => {
  try {
    const ticketOrderId = req.params.ticketOrderId;
    await orderTicketService.deleteOrderTicket(ticketOrderId);
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const update = async (req, res) => {
  try {
    const quantity = req.body.quantity;
    const ticketOrderId = req.params.ticketOrderId;
    const result = await orderTicketService.putOrderTicket(
      quantity,
      ticketOrderId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const create = async (req, res) => {
  try {
    const userId = req.body.userId;
    const ticketId = req.body.ticketId;
    const quantity = req.body.quantity;
    if (!userId || !ticketId || !quantity) {
      return res.status(400).json({
        message: "missing fields",
      });
    }
    const result = await RunInTransaction((transaction) => {
      return orderTicketService.AddTicketToOrder(
        userId,
        ticketId,
        quantity,
        transaction
      );
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const returnTicket = async (req, res) => {
  try {
    const userId = req.body.userId;
    const ticketId = req.body.ticketId;
    const returnTicketQuantity = req.body.quantity;
    const result = await walletTransactionService.returnTicket(
      userId,
      ticketId,
      returnTicketQuantity
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
