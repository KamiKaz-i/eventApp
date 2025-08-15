import * as eventRepository from "../repositories/event.repository.js";
import * as userRepository from "../repositories/user.repository.js";
import * as ticketRepository from "../repositories/ticket.repository.js";
export const deleteEvent = async (eventId, userId) => {
  try {
    const event = await eventRepository.getEvent(eventId);
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
    const event = await eventRepository.getEventWithTicketInfo(eventId);
    if (!event) {
      throw new Error(`event not found`);
    }
    let eventOwner = await userRepository.getUserById(
      event.dataValues.organizer_id
    );
    let eventres = { ...event.dataValues, owner: eventOwner.name };
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
    let events = await eventRepository.getMyEvents(userId);
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
    await ticketRepository.createTicket(ticket, result.id);
    return { message: "noice", data: result };
  } catch (error) {
    throw error;
  }
};

export const putEvent = async (eventId, updatedEvent, price) => {
  try {
    await ticketRepository.updateTicket(eventId, price);
    await eventRepository.updateEvent(updatedEvent, eventId);
  } catch (error) {
    throw error;
  }
};
