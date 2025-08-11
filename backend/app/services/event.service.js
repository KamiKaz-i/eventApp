import * as eventRepository from "../repositories/event.repository.js";
import * as userRepository from "../repositories/user.repository.js";
import * as ticketRepository from "../repositories/ticket.repository.js";
export const deleteEvent = async (eventId, userId) => {
  try {
    if (!eventId) {
      throw new Error(`missing event Id`);
    }
    const event = await eventRepository.getEvent({ id: eventId });
    if (!event) {
      throw new Error(`event not found`);
    }
    if (event.organizer_id !== userId) {
      throw new Error(`you cant delete this event`);
    }
    await eventRepository.deleteEvent(eventId);
  } catch (error) {
    throw error;
  }
};

export const getEvent = async (eventId) => {
  try {
    if (!eventId) {
      throw new Error(`missing eventId`);
    }
    const event = await eventRepository.getEvent({ id: eventId }, true);
    if (!event) {
      throw new Error(`event not found`);
    }
    let eventOwner = await userRepository.getUser({
      id: event.dataValues.organizer_id,
    });

    let eventres = { ...event.dataValues };
    eventres.owner = eventOwner.name;
    return eventres;
  } catch (error) {
    throw error;
  }
};

export const getEvents = async () => {
  try {
    let events = await eventRepository.getEvents();
    if (!events) {
      throw new Error(`events not found`);
    }
    return events;
  } catch (error) {
    throw error;
  }
};

export const getMyEvents = async (userId) => {
  try {
    let events = await eventRepository.getEvents({ organizer_id: userId });
    if (!events) {
      throw new Error(`events not found`);
    }
    return events;
  } catch (error) {
    throw error;
  }
};

export const postEvent = async (event, ticket) => {
  try {
    const result = await eventRepository.createEvent(event);
    await ticketRepository.createTicket({
      ...ticket,
      event_id: result.dataValues.id,
    });
    return { message: "noice", data: result.dataValues };
  } catch (error) {
    throw error;
  }
};

export const putEvent = async (eventId, eventInfo) => {
  const { title, description, date, price, type } = eventInfo;
  const parsedPrice = parseFloat(price);
  try {
    let updatedEvent = {};
    if (title !== undefined) {
      updatedEvent.title = title;
    }
    if (description !== undefined) {
      updatedEvent.description = description;
    }
    if (date !== undefined) {
      updatedEvent.date = date;
    }
    if (type !== undefined) {
      updatedEvent.type = type;
    }

    if (isNaN(parsedPrice)) {
      throw new Error("no valid price provided to update.");
    }
    if (Object.keys(updatedEvent).length === 0) {
      throw new Error(`no valid fields provided to update.`);
    }
    await ticketRepository.updateTicket(eventId, parsedPrice);
    await eventRepository.updateEvent(updatedEvent, eventId);
  } catch (error) {
    throw error;
  }
};
