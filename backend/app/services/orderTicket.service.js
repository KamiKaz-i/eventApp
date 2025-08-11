import * as orderTicketRepository from "../repositories/orderTicket.repository.js";
import * as orderRepository from "../repositories/order.repository.js";
import * as ticketRepository from "../repositories/ticket.repository.js";
export const getOrderTicket = async (userId) => {
  try {
    console.log(userId);

    const result = await orderRepository.getOrder({
      user_id: userId,
      status: "pending",
    });
    console.log(result);

    let order = result[0];
    if (!order) {
      const err = new Error("order not found");
      err.code = "ORDER_NOT_FOUND";
      throw err;
    }
    console.log("2");
    const orderTickets = await orderTicketRepository.getOrderTicket(order.id);
    if (!orderTickets) {
      const err = new Error("ticket not found");
      err.code = "TICKET_NOT_FOUND";
      throw err;
    }
    return { orderTickets, order };
  } catch (error) {
    throw error;
  }
};

export const deleteOrderTicket = async (ticketOrderId) => {
  try {
    const orderTicket = await orderTicketRepository.getOneOrderTicket({
      id: ticketOrderId,
    });

    if (!orderTicket) {
      throw new Error("Order ticket not found");
    }
    const result = await orderRepository.getOrder({ id: orderTicket.order_id });
    const order = result[0];
    if (!order) {
      throw new Error("Order not found");
    }
    await orderRepository.increment(
      { id: order.id },
      { total_price: -orderTicket.dataValues.subtotal_price }
    );
    await orderTicketRepository.deleteOrderTicket({ id: ticketOrderId });
    const remainingTickets = await orderTicketRepository.remainingTickets({
      order_id: order.dataValues.id,
    });

    if (remainingTickets === 0) {
      await orderRepository.deleteOrder({ id: order.dataValues.id });
    }
  } catch (error) {
    throw error;
  }
};
export const putOrderTicket = async (quantity, ticketOrderId) => {
  try {
    const orderTicket = await orderTicketRepository.getOneOrderTicket({
      id: ticketOrderId,
    });

    if (!orderTicket) {
      throw new Error("Order ticket not found");
    }

    const order = await orderRepository.getOneOrder({
      id: orderTicket.order_id,
    });

    if (!order) {
      throw new Error("Order not found ");
    }
    const resultTicket = await ticketRepository.getTicket({
      id: orderTicket.dataValues.ticket_id,
    });
    if (!resultTicket) {
      throw new Error("ticket not found 404");
    }
    let priceOfTicket = resultTicket.dataValues.price;
    let quantityAvailable = resultTicket.dataValues.quantity_available;
    let subtotalPrice = quantity * priceOfTicket;

    if (quantity > quantityAvailable) {
      throw new Error("insufficient quantity of tickets available");
    }

    await orderTicketRepository.updateOrderTicket(
      {
        order_id: order.dataValues.id,
        ticket_id: orderTicket.dataValues.ticket_id,
      },
      {
        quantity: quantity,
        subtotal_price: subtotalPrice,
      }
    );

    let updatedSubtotalPrice =
      subtotalPrice - orderTicket.dataValues.subtotal_price;

    await orderRepository.increment(
      {
        id: order.dataValues.id,
        status: "pending",
      },
      {
        total_price: updatedSubtotalPrice,
      }
    );
    const updatedOrder = await orderRepository.getOneOrder({
      id: order.dataValues.id,
    });
    const updatedOrderTicket = await orderTicketRepository.getOneOrderTicket({
      order_id: order.id,
      ticket_id: orderTicket.dataValues.ticket_id,
    });
    return {
      order: updatedOrder.dataValues,
      ticketId: orderTicket.dataValues.ticket_id,
      quantity: quantity,
      orderTicket: updatedOrderTicket.dataValues,
    };
  } catch (error) {
    throw error;
  }
};

export const postOrderTicket = async (userId, ticketId, quantity) => {
  try {
    const ticket = await ticketRepository.getTicket({
      id: ticketId,
    });
    if (ticket.Event.organizer_id === userId) {
      throw new Error("You can't buy tickets for your own event");
    }
    let priceOfTicket = ticket.dataValues.price;
    let quantityAvailable = ticket.dataValues.quantity_available;
    let subtotalPrice = quantity * priceOfTicket;
    const order = await orderRepository.findOrCreate(
      { user_id: userId, status: "pending" },
      { total_price: 0 }
    );
    if (quantity > quantityAvailable) {
      throw new Error("insufficient quantity of tickets available");
    }

    const [orderTicket, createdOrderTicket] =
      await orderTicketRepository.createTicket(
        {
          order_id: order[0].dataValues.id,
          ticket_id: ticketId,
        },
        {
          subtotal_price: subtotalPrice,
          quantity: quantity,
        }
      );
    if (!createdOrderTicket) {
      throw new Error("Ticket is already in the cart");
    }
    await orderRepository.increment(
      {
        user_id: userId,
        status: "pending",
      },
      { total_price: subtotalPrice }
    );
    return {
      order: order.dataValues,
      ticketId: ticketId,
      quantity: quantity,
      orderTicket: orderTicket,
    };
  } catch (error) {
    throw error;
  }
};
