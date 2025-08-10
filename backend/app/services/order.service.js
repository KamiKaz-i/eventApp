import * as orderRepository from "../repositories/order.repository.js";
export const getOrder = async (userId) => {
  const orders = await orderRepository.getOrder(userId);
  let tickets = {};
  for (let order of orders) {
    for (let orderTicket of order.Order_tickets) {
      const eventId = orderTicket.Ticket.Event.id;
      const eventTitle = orderTicket.Ticket.Event.title;
      const quantity = orderTicket.quantity;
      const eventDate = orderTicket.Ticket.Event.date;
      if (!tickets[eventId]) {
        tickets[eventId] = {
          eventTitle: eventTitle,
          ticketCount: 0,
        };
      }
      tickets[eventId].ticketCount += quantity;
      tickets[eventId].date = eventDate;
    }
  }
  if (!tickets) {
    throw new Error("You don't have any tickets");
  }
  return tickets;
};
