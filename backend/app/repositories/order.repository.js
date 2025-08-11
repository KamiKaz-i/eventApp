import db from "../config/db.config.js";
const Order = db.Order;
const OrderTicket = db.Order_ticket;
const Ticket = db.Ticket;
const Event = db.Event;
export const getOrder = async (options) => {
  try {
    const orders = await Order.findAll({
      where: {
        ...options,
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
export const increment = async (options, subtotalPrice) => {
  try {
    await Order.increment(
      { total_price: -subtotalPrice },
      { where: { ...options } }
    );
  } catch (error) {
    throw new Error(error);
  }
};
export const deleteOrder = async (options) => {
  try {
    await Order.destroy({ where: { ...options } });
  } catch (error) {
    throw new Error(error);
  }
};
