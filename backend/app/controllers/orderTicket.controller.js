import * as orderTicketService from "../services/orderTicket.service.js";
export const getOrderTicket = async (req, res) => {
  try {
    let userId = req.params.userId;
    const result = await orderTicketService.getOrderTicket(userId);
    res.status(200).json(result);
  } catch (error) {
    if (error.code === "ORDER_NOT_FOUND") {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteOrderTicket = async (req, res) => {
  try {
    let ticketOrderId = req.params.ticketOrderId;
    await orderTicketService.deleteOrderTicket(ticketOrderId);
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const putOrderTicket = async (req, res) => {
  try {
    let quantity = req.body.quantity;
    let ticketOrderId = req.params.ticketOrderId;
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
export const postOrderTicket = async (req, res) => {
  try {
    let userId = req.body.userId;
    let ticketId = req.body.ticketId;
    let quantity = req.body.quantity;
    const result = await orderTicketService.postOrderTicket(
      userId,
      ticketId,
      quantity
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
