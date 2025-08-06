import db from "../config/db.config.js";

const Order = db.Order;
const OrderTicket = db.Order_ticket;
const Ticket = db.Ticket;
const Event = db.Event;

export const getOrder = async (req, res) => {
  try {
    const userId = req.params.id;
    const orders = await Order.findAll({
      where: {
        user_id: userId,
        status: "paid",
      },
      include: [
        {
          model: OrderTicket,
          include: [
            {
              model: Ticket,
              include: [Event],
            },
          ],
        },
      ],
    });
    let tickets = {};
    for (let order of orders) {
      for (let orderTicket of order.Order_tickets) {
        const eventTitle = orderTicket.Ticket.Event.title;
        const quantity = orderTicket.quantity;
        const eventDate = orderTicket.Ticket.Event.date;
        if (!tickets[eventTitle]) {
          tickets[eventTitle] = {
            eventTitle: eventTitle,
            ticketCount: 0,
          };
        }
        tickets[eventTitle].ticketCount += quantity;
        tickets[eventTitle].date = eventDate;
      }
    }

    res.status(200).json(Object.values(tickets));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
