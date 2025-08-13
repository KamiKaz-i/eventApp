import db from "../config/db.config.js";
const OrderTicket = db.Order_ticket;
const Event = db.Event;
const Ticket = db.Ticket;
const Order = db.Order;
export const createTicket = async (ticket) => {
  const newTicket = await Ticket.create(ticket);
};
export const updateTicket = async (eventId, parsedPrice) => {
  const updatedTicket = await Ticket.update(
    { price: parsedPrice },
    { where: { event_id: eventId } }
  );
};
export const updateTicketQuantityAvaiable = async (orderId) => {
  await db.sequelize.query(
    `UPDATE tickets
               INNER JOIN order_tickets ON tickets.id = order_tickets.ticket_id
               INNER JOIN orders ON order_tickets.order_id = orders.id
               SET tickets.quantity_available = tickets.quantity_available - order_tickets.quantity
               WHERE orders.id = :orderId`,
    {
      replacements: { orderId: orderId },
      type: db.Sequelize.QueryTypes.UPDATE,
    }
  );
};

export const getTicket = async (options) => {
  const resultTicket = await Ticket.findOne({
    where: {
      ...options,
    },
    include: [{ model: Event }],
  });
  return resultTicket;
};
