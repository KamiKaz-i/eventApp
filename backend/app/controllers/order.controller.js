import db from "../config/db.config.js";
import * as orderService from "../services/order.service.js";
const Order = db.Order;
const OrderTicket = db.Order_ticket;
const Ticket = db.Ticket;
const Event = db.Event;

export const getOrder = async (req, res) => {
  try {
    const orders = await orderService.getOrder(req.params.id);
    res.status(200).json(Object.values(orders));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
