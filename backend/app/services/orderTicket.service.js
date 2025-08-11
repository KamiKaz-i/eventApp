import * as orderTicketRepository from "../repositories/orderTicket.repository.js";
import * as orderRepository from "../repositories/order.repository.js";
export const getOrderTicket = async (userId) => {
  try {
    const result = await orderRepository.getOrder({
      user_id: userId,
      status: "pending",
    });
    let order = result[0];
    if (!order) {
      console.log("not found");

      throw new Error(`Order not found`);
    }

    const orderTickets = await orderTicketRepository.getOrderTicket(order.id);
    if (!orderTickets) {
      throw new Error(`Ticket not found`);
    }
    return { orderTickets, order };
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteOrderTicket = async (ticketOrderId) => {
  try {
    const orderTicket = await orderTicketRepository.getOneOrderTicket(
      ticketOrderId
    );

    if (!orderTicket) {
      throw new Error("Order ticket not found");
    }
    const result = await orderRepository.getOrder({ id: orderTicket.order_id });
    const order = result[0];
    if (!order) {
      throw new Error("Order not found");
    }
    console.log(order);
    await orderRepository.increment(
      { id: order.id },
      orderTicket.dataValues.subtotal_price
    );
    await orderTicketRepository.deleteOrderTicket({ id: ticketOrderId });
    const remainingTickets = await orderTicketRepository.remainingTickets({
      order_id: order.dataValues.id,
    });

    if (remainingTickets === 0) {
      await orderRepository.deleteOrder({ id: order.dataValues.id });
    }

    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
