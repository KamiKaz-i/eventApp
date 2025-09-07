import * as orderTicketService from "../services/orderTicket.service.js";
export const getOrderTicket = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await orderTicketService.getOrderTicket(userId);

    res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: "Order not found" });
  }
};
// if (error.code === "ORDER_NOT_FOUND") {
//       return res.status(200).json({ message: "Order not found" });
//     }
//     return res.status(404).json({ message: "err" });
export const deleteOrderTicket = async (req, res) => {
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
export const putOrderTicket = async (req, res) => {
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
export const postOrderTicket = async (req, res) => {
  try {
    const userId = req.body.userId;
    const ticketId = req.body.ticketId;
    const quantity = req.body.quantity;
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
