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
export const getOrderTicketWithUser = async (orderId, dbTransaction) => {
  const result = await OrderTicket.findAll({
    where: {
      order_id: orderId,
    },
    include: [
      {
        model: db.Ticket,
        include: [
          {
            model: db.Event,
            include: [
              {
                model: db.User,
                include: [
                  {
                    model: db.Wallet,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    transaction: dbTransaction,
  });
  return result;
};
export const getOneOrderTicket = async (orderId, ticketId) => {
  const orderTicket = await OrderTicket.findOne({
    where: {
      order_id: orderId,
      ticket_id: ticketId,
    },
    include: [
      {
        model: Ticket,
        include: [
          {
            model: Event,
          },
        ],
      },
    ],
  });
  return orderTicket;
};
export const getOneOrderTicketById = async (ticketOrderId) => {
  const orderTicket = await OrderTicket.findOne({
    where: {
      id: ticketOrderId,
    },
    include: [
      {
        model: Ticket,
        include: [
          {
            model: Event,
          },
        ],
      },
    ],
  });
  return orderTicket;
};
export const deleteOrderTicket = async (ticketId) => {
  try {
    await OrderTicket.destroy({
      where: { id: ticketId },
    });
  } catch (error) {
    throw new Error(error);
  }
};
export const remainingTickets = async (orderId) => {
  try {
    const remainingTickets = await OrderTicket.count({
      where: {
        order_id: orderId,
      },
    });
    return remainingTickets;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateOrderTicket = async (
  orderId,
  ticketId,
  quantity,
  subtotalPrice
) => {
  try {
    await OrderTicket.update(
      {
        quantity: quantity,
        subtotal_price: subtotalPrice,
      },
      {
        where: {
          order_id: orderId,
          ticket_id: ticketId,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const createOrderTicket = async (
  orderId,
  ticketId,
  subtotalPrice,
  quantity
) => {
  try {
    const result = await OrderTicket.findOrCreate({
      where: {
        order_id: orderId,
        ticket_id: ticketId,
      },
      defaults: {
        subtotal_price: subtotalPrice,
        quantity: quantity,
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};
