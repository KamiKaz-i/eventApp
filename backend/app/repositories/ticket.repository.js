import db from "../config/db.config.js";

const Event = db.Event;
const Ticket = db.Ticket;
export const createTicket = async (ticket) => {
  const newTicket = await Ticket.create(ticket);
};
export const updateTicket = async (eventId, parsedPrice) => {
  const updatedTicket = await Ticket.update(
    { price: parsedPrice },
    { where: { event_id: eventId } }
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
