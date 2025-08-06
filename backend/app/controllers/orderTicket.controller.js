import db from "../config/db.config.js";

let Order = db.Order;
let OrderTicket = db.Order_ticket;
let Ticket = db.Ticket;
let Event = db.Event;
export const getOrderTicket = async (req, res) => {
  try {
    let userId = req.params.userId;
    const order = await Order.findOne({
      where: {
        user_id: userId,
        status: "pending",
      },
    });

    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }
    const orderTickets = await OrderTicket.findAll({
      where: {
        order_id: order.id,
      },
      include: [{ model: Ticket, include: [{ model: Event }] }],
    });
    if (!orderTickets) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({ orderTickets, order });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export const deleteOrderTicket = async (req, res) => {
  try {
    let ticketOrderId = req.params.ticketOrderId;

    const orderTicket = await OrderTicket.findOne({
      where: {
        id: ticketOrderId,
      },
    });
    if (!orderTicket) {
      return res.status(404).json({ message: "Order ticket not found" });
    }

    const order = await Order.findOne({
      where: { id: orderTicket.order_id },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await Order.increment(
      { total_price: -orderTicket.dataValues.subtotal_price },
      { where: { id: order.id } }
    );
    await OrderTicket.destroy({
      where: { id: ticketOrderId },
    });
    const remainingTickets = await OrderTicket.count({
      where: { order_id: order.dataValues.id },
    });

    if (remainingTickets === 0) {
      await Order.destroy({ where: { id: order.dataValues.id } });
    }

    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export const putOrderTicket = async (req, res) => {
  try {
    let quantity = req.body.quantity;
    let ticketOrderId = req.params.ticketOrderId;

    const orderTicket = await OrderTicket.findOne({
      where: {
        id: ticketOrderId,
      },
    });
    if (!orderTicket) {
      return res.status(404).json({ message: "Order ticket not found" });
    }

    const order = await Order.findOne({
      where: { id: orderTicket.order_id },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const resultTicket = await Ticket.findOne({
      where: {
        id: orderTicket.dataValues.ticket_id,
      },
    });
    if (!resultTicket) {
      return res.status(404).json({ message: "ticket not found 404" });
    }

    let priceOfTicket = resultTicket.dataValues.price;
    let quantityAvailable = resultTicket.dataValues.quantity_available;

    let subtotalPrice = quantity * priceOfTicket;

    if (quantity > quantityAvailable) {
      return res.status(400).json({
        message: "insufficient quantity of tickets available",
      });
    }
    await OrderTicket.update(
      {
        quantity: quantity,
        subtotal_price: subtotalPrice,
      },
      {
        where: {
          order_id: order.dataValues.id,
          ticket_id: orderTicket.dataValues.ticket_id,
        },
      }
    );
    let updatedSubtotalPrice =
      subtotalPrice - orderTicket.dataValues.subtotal_price;

    await Order.increment(
      {
        total_price: updatedSubtotalPrice,
      },
      {
        where: {
          id: order.dataValues.id,
          status: "pending",
        },
      }
    );
    const updatedOrder = await Order.findOne({
      where: {
        id: order.dataValues.id,
      },
    });
    const updatedOrderTicket = await OrderTicket.findOne({
      where: {
        order_id: order.id,
        ticket_id: orderTicket.dataValues.ticket_id,
      },
    });
    res.status(200).json({
      order: updatedOrder.dataValues,
      ticketId: orderTicket.dataValues.ticket_id,
      quantity: quantity,
      orderTicket: updatedOrderTicket.dataValues,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message,
    });
  }
};
export const postOrderTicket = async (req, res) => {
  try {
    let userId = req.body.userId;
    let ticketId = req.body.ticketId;
    let quantity = req.body.quantity;
    const ticket = await Ticket.findOne({
      where: {
        id: ticketId,
      },
      include: [{ model: Event }],
    });

    if (ticket.Event.organizer_id === userId) {
      return res
        .status(400)
        .json({ message: "You can't buy tickets for your own event" });
    }
    let priceOfTicket = ticket.dataValues.price;
    let quantityAvailable = ticket.dataValues.quantity_available;
    let subtotalPrice = quantity * priceOfTicket;

    const [order, created] = await Order.findOrCreate({
      where: {
        user_id: userId,
        status: "pending",
      },
      defaults: {
        total_price: 0,
      },
    });

    if (quantity > quantityAvailable) {
      return res.status(400).json({
        message: "insufficient quantity of tickets available",
      });
    }

    const [orderTicket, createdOrderTicket] = await OrderTicket.findOrCreate({
      where: {
        order_id: order.dataValues.id,
        ticket_id: ticketId,
      },
      defaults: {
        subtotal_price: subtotalPrice,
        quantity: quantity,
      },
    });
    if (!createdOrderTicket) {
      return res.status(404).json({ message: "Ticket is already in the cart" });
    }
    await Order.increment(
      { total_price: subtotalPrice },
      {
        where: {
          user_id: userId,
          status: "pending",
        },
      }
    );
    res.status(200).json({
      order: order.dataValues,
      ticketId: ticketId,
      quantity: quantity,
      orderTicket: orderTicket,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
