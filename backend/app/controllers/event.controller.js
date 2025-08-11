import db from "../config/db.config.js";
import * as eventService from "../services/event.service.js";
const Event = db.Event;
const Ticket = db.Ticket;
const User = db.User;
export const deleteEvent = async (req, res) => {
  let eventId = req.params.eventId;
  const userId = req.user.id;
  try {
    await eventService.deleteEvent(eventId, userId);
    res.status(200).json({ message: "event deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message,
    });
  }
};
export const putEvent = async (req, res) => {
  let eventId = req.params.eventId;
  const { title, description, date, price, type } = req.body;

  try {
    await eventService.putEvent(eventId, {
      title,
      description,
      date,
      price,
      type,
    });
    res.status(200).json({ message: "event updated" });
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message,
    });
  }
};
export const getEvent = async (req, res) => {
  let eventId = req.params.eventId;
  try {
    const event = await eventService.getEvent(eventId);

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message,
    });
  }
};
export const getEvents = async (req, res) => {
  try {
    const events = await eventService.getEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message,
    });
  }
};
export const getMyEvents = async (req, res) => {
  console.log(req.user);

  try {
    let events = await eventService.getMyEvents(req.user.id);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message,
    });
  }
};
export const postEvent = async (req, res) => {
  try {
    console.log(req.body);
    let event = {
      organizer_id: req.body.organizer_id,
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      total_tickets: req.body.total_tickets,
      type: req.body.type,
    };
    let ticket = {
      price: req.body.price,
      quantity_available: req.body.total_tickets,
    };
    const result = await eventService.postEvent(event, ticket);
    res.status(200).json({
      message: "noice",
      data: result.dataValues,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message,
    });
  }
};
