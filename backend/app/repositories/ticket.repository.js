import db from "../config/db.config.js";

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
