import db from "../config/db.config.js";
const Order = db.Order;
const OrderTicket = db.Order_ticket;
const Ticket = db.Ticket;
const Event = db.Event;
export const getOrder = async (userId) => {
  try {
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
    return orders;
  } catch (error) {
    throw new Error(`db error ${error}`);
  }
};
