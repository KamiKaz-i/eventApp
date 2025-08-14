import db from "../config/db.config.js";
const Order = db.Order;
const OrderTicket = db.Order_ticket;
const Ticket = db.Ticket;
const Event = db.Event;
export const getOneOrder = async (orderId) => {
  try {
    const orders = await Order.findOne({
      where: {
        id: orderId,
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
export const getPendingOrder = async (userId) => {
  try {
    const orders = await Order.findAll({
      where: {
        user_id: userId,
        status: "pending",
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
export const getPaidOrder = async (userId) => {
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
export const getOrderById = async (orderId) => {
  try {
    const orders = await Order.findAll({
      where: { id: orderId },
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

export const increment = async (orderId, increment) => {
  try {
    await Order.increment(
      { total_price: increment },
      { where: { id: orderId, status: "pending" } }
    );
  } catch (error) {
    throw new Error(error);
  }
};
export const deleteOrder = async (orderId) => {
  try {
    await Order.destroy({ where: { id: orderId } });
  } catch (error) {
    throw new Error(error);
  }
};

export const findOrCreate = async (userId) => {
  try {
    const order = await Order.findOrCreate({
      where: { user_id: userId, status: "pending" },
      defaults: {
        total_price: 0,
      },
    });
    return order;
  } catch (error) {
    throw error;
  }
};
