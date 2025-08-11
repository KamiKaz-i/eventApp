import db from "../config/db.config.js";

const Event = db.Event;
const Ticket = db.Ticket;

export const getEvent = async (options, includeTicketInfo = false) => {
  if (includeTicketInfo) {
    const event = await Event.findOne({
      include: [
        {
          model: Ticket,
          attributes: ["quantity_available", "price", "id"],
        },
      ],
      where: {
        ...options,
      },
    });
    return event;
  } else {
    const event = await Event.findOne(...options);
    return event;
  }
};
export const getEvents = async (options) => {
  let events = await Event.findAll({
    include: [
      {
        model: Ticket,
        attributes: ["quantity_available", "price"],
      },
    ],
    where: {
      ...options,
    },
  });
  return events;
};
export const updateEvent = async (updatedEvent, eventId) => {
  const event = await Event.update(updatedEvent, { where: { id: eventId } });
  return event;
};
export const createEvent = async (event) => {
  const newEvent = await Event.create(event);
  return newEvent;
};
export const deleteEvent = async (eventId) => {
  const deletedEvent = await Event.destroy({
    where: {
      id: eventId,
    },
  });
  return deletedEvent;
};
