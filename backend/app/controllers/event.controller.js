import * as eventService from "../services/event.service.js";

export const deleteEvent = async (req, res) => {
  const eventId = req.params.eventId;
  const userId = req.user.id;
  if (!eventId) {
    return res.status(404).json({ message: "missing id of user" });
  }
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
  const eventId = req.params.eventId;
  const { title, description, date, price, type } = req.body;
  if (!eventId) {
    return res.status(400).json({ message: "missing id of user" });
  }
  if (!title || !description || !date || !price || !type) {
    return res.status(400).json({ message: "missing event data" });
  }
  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice)) {
    return res
      .status(400)
      .json({ message: "no valid price provided to update." });
  }
  try {
    await eventService.putEvent(
      eventId,
      {
        title,
        description,
        date,
        type,
      },
      parsedPrice
    );
    res.status(200).json({ message: "event updated" });
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message,
    });
  }
};
export const getEvent = async (req, res) => {
  const eventId = req.params.eventId;
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
  try {
    const events = await eventService.getMyEvents(req.user.id);
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
    const { title, description, date, total_tickets, type, price } = req.body;
    if (!title || !description || !date || !price || !type || !total_tickets) {
      return res.status(400).json({ message: "missing event data" });
    }
    const event = {
      organizer_id: req.user.id,
      title,
      description,
      date,
      total_tickets,
      type,
    };
    const ticket = {
      price,
      quantity_available: total_tickets,
    };
    const result = await eventService.postEvent(event, ticket);
    res.status(200).json({
      data: result.dataValues,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message,
    });
  }
};
