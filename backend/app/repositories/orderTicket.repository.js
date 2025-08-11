import db from "../config/db.config.js";
let OrderTicket = db.Order_ticket;
let Ticket = db.Ticket;
let Event = db.Event;

export const getOrderTicket = async (orderId) => {
  const result = await OrderTicket.findAll({
    where: {
      order_id: orderId,
    },
    include: [{ model: Ticket, include: [{ model: Event }] }],
  });
  return result;
};
export const getOneOrderTicket = async (ticketOrderId) => {
  const orderTicket = await OrderTicket.findOne({
    where: {
      id: ticketOrderId,
    },
  });
  return orderTicket;
};
export const deleteOrderTicket = async (options) => {
  try {
    await OrderTicket.destroy({
      where: { ...options },
    });
  } catch (error) {
    throw new Error(error);
  }
};
export const remainingTickets = async (options) => {
  try {
    const remainingTickets = await OrderTicket.count({
      where: { ...options },
    });
    return remainingTickets;
  } catch (error) {
    throw new Error(error);
  }
};
