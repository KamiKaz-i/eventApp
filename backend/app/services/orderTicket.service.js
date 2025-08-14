import * as orderTicketRepository from "../repositories/orderTicket.repository.js";
import * as orderRepository from "../repositories/order.repository.js";
import * as ticketRepository from "../repositories/ticket.repository.js";

export const getOrderTicket = async (userId) => {
  try {
    const result = await orderRepository.getPendingOrder(userId);

    let order = result[0];
    if (!order) {
      const err = new Error("order not found");
      err.code = "ORDER_NOT_FOUND";
      throw err;
    }
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
    const orderTicket = await orderTicketRepository.getOneOrderTicketById(
      ticketOrderId
    );

    if (!orderTicket) {
      throw new Error("Order ticket not found");
    }
    const [order, alreadyExisted] = await orderRepository.getOrderById(
      orderTicket.order_id
    );

    if (!order) {
      throw new Error("Order not found");
    }
    await orderRepository.increment(order.id, -orderTicket.subtotal_price);
    await orderTicketRepository.deleteOrderTicket(ticketOrderId);
    const remainingTickets = await orderTicketRepository.remainingTickets(
      order.id
    );

    if (remainingTickets === 0) {
      await orderRepository.deleteOrder(order.id);
    }
  } catch (error) {
    throw error;
  }
};

export const putOrderTicket = async (quantity, ticketOrderId) => {
  try {
    const orderTicket = await orderTicketRepository.getOneOrderTicketById(
      ticketOrderId
    );

    if (!orderTicket) {
      throw new Error("Order ticket not found");
    }
    const order = await orderRepository.getOneOrder(orderTicket.order_id);

    if (!order) {
      throw new Error("Order not found ");
    }
    const resultTicket = await ticketRepository.getTicket(
      orderTicket.ticket_id
    );
    if (!resultTicket) {
      throw new Error("ticket not found 404");
    }
    let priceOfTicket = resultTicket.price;
    let quantityAvailable = resultTicket.quantity_available;
    let subtotalPrice = quantity * priceOfTicket;

    if (quantity > quantityAvailable) {
      throw new Error("insufficient quantity of tickets available");
    }

    await orderTicketRepository.updateOrderTicket(
      order.id,
      orderTicket.ticket_id,
      quantity,
      subtotalPrice
    );

    let updatedSubtotalPrice = subtotalPrice - orderTicket.subtotal_price;

    await orderRepository.increment(order.id, updatedSubtotalPrice);
    const updatedOrder = await orderRepository.getOneOrder(order.id);

    const updatedOrderTicket = await orderTicketRepository.getOneOrderTicket(
      order.id,
      orderTicket.ticket_id
    );
    return {
      order: updatedOrder,
      ticketId: orderTicket.ticket_id,
      quantity: quantity,
      orderTicket: updatedOrderTicket,
    };
  } catch (error) {
    throw error;
  }
};

export const postOrderTicket = async (userId, ticketId, quantity) => {
  try {
    const ticket = await ticketRepository.getTicket(ticketId);
    if (ticket.Event.organizer_id === userId) {
      throw new Error("You can't buy tickets for your own event");
    }
    let priceOfTicket = ticket.price;
    let quantityAvailable = ticket.quantity_available;
    let subtotalPrice = quantity * priceOfTicket;
    const [order, alreadyExisted] = await orderRepository.findOrCreate(userId);
    if (quantity > quantityAvailable) {
      throw new Error("insufficient quantity of tickets available");
    }

    const [orderTicket, createdOrderTicket] =
      await orderTicketRepository.createOrderTicket(
        order.id,
        ticketId,
        subtotalPrice,
        quantity
      );
    if (!createdOrderTicket) {
      throw new Error("Ticket is already in the cart");
    }
    await orderRepository.increment(order.id, subtotalPrice);
    return {
      order: order,
      ticketId: ticketId,
      quantity: quantity,
      orderTicket: orderTicket,
    };
  } catch (error) {
    throw error;
  }
};
