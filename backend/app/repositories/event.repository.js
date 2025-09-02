import db from "../config/db.config.js";
import { Op } from "sequelize";
const Event = db.Event;
const Ticket = db.Ticket;

export const getEvent = async (eventId) => {
  try {
    const event = await Event.findOne({
      where: {
        id: eventId,
      },
    });
    return event;
  } catch (error) {
    throw error;
  }
};
export const getEventWithTicketInfo = async (eventId) => {
  try {
    const event = await Event.findOne({
      include: [
        {
          model: Ticket,
          attributes: ["quantity_available", "price", "id"],
        },
      ],
      where: {
        id: eventId,
      },
    });

    return event;
  } catch (error) {
    throw error;
  }
};
export const getEvents = async (options) => {
  try {
    const { has_tickets, price, ...eventFilters } = options;
    const where = {};
    const whereTicket = {};
    const priceCondition = {};
    const query = {
      where: where,
      include: [
        {
          where: whereTicket,
          model: Ticket,
          attributes: ["quantity_available", "price"],
        },
      ],
    };
    if (eventFilters.type) {
      where.type = eventFilters.type;
    }
    if (eventFilters.phrase) {
      where.title = { [Op.startsWith]: eventFilters.phrase };
    }
    if (has_tickets) {
      whereTicket.quantity_available = { [Op.gt]: 0 };
    }

    if (price?.gt) {
      const priceGt = parseFloat(price.gt);
      priceCondition[Op.gt] = priceGt;
    }
    if (price?.lt) {
      const priceLt = parseFloat(price.lt);
      priceCondition[Op.lt] = priceLt;
    }

    if (Object.getOwnPropertySymbols(priceCondition).length > 0) {
      whereTicket.price = priceCondition;
    }
    let events = await Event.findAll(query);
    return events;
  } catch (error) {
    throw error;
  }
};
export const getMyEvents = async (userId) => {
  try {
    let events = await Event.findAll({
      include: [
        {
          model: Ticket,
          attributes: ["quantity_available", "price"],
        },
      ],
      where: {
        organizer_id: userId,
      },
    });
    return events;
  } catch (error) {
    throw error;
  }
};
export const updateEvent = async (updatedEvent, eventId) => {
  try {
    const event = await Event.update(updatedEvent, { where: { id: eventId } });
    return event;
  } catch (error) {
    throw error;
  }
};
export const createEvent = async (event) => {
  try {
    const newEvent = await Event.create(event);
    return newEvent;
  } catch (error) {
    throw error;
  }
};
export const deleteEvent = async (eventId) => {
  try {
    const deletedEvent = await Event.destroy({
      where: {
        id: eventId,
      },
    });
    return deletedEvent;
  } catch (error) {
    throw error;
  }
};
