import db from "../config/db.config.js";

const Event = db.Event;
const Ticket = db.Ticket;
const User = db.User;
export const deleteEvent = async (req, res) => {
  let eventId = req.params.eventId;
  const userId = req.user.id;
  try {
    if (!eventId) {
      res.status(404).json({
        message: "missing event Id",
      });
    }
    const event = await Event.findOne({ where: { id: eventId } });
    if (!event) {
      return res.status(404).json({
        message: "event not found",
      });
    }
    if (event.organizer_id !== userId) {
      return res.status(403).json({ message: "you cant delete this event" });
    }

    await Event.destroy({
      where: {
        id: eventId,
      },
    });
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
    console.log(updatedEvent);

    if (isNaN(parsedPrice)) {
      return res
        .status(400)
        .json({ message: "no valid price provided to update." });
    }
    if (Object.keys(updatedEvent).length === 0) {
      return res
        .status(400)
        .json({ message: "no valid fields provided to update." });
    }
    await Ticket.update(
      { price: parsedPrice },
      { where: { event_id: eventId } }
    );
    await Event.update(updatedEvent, { where: { id: eventId } });
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
    if (!eventId) {
      res.status(400).json({
        message: "missing eventId",
      });
    }
    let event = await Event.findOne({
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

    if (!event) {
      return res.status(404).json({ message: "event not found" });
    }
    let eventOwner = await User.findOne({
      where: {
        id: event.organizer_id,
      },
    });
    // console.log(eventOwner);

    let eventres = { ...event.dataValues };
    eventres.owner = eventOwner.name;
    res.status(200).json(eventres);
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message,
    });
  }
};
export const getEvents = async (req, res) => {
  try {
    let events = await Event.findAll({
      include: [
        {
          model: Ticket,
          attributes: ["quantity_available", "price"],
        },
      ],
    });
    if (!events) {
      return res.status(404).json({ message: "events not found" });
    }
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
    let events = await Event.findAll({
      include: [
        {
          model: Ticket,
          attributes: ["quantity_available", "price"],
        },
      ],
      where: {
        organizer_id: req.user.id,
      },
    });
    if (!events) {
      return res.status(404).json({ message: "events not found" });
    }
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
    let event = {
      organizer_id: req.body.organizer_id,
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      total_tickets: req.body.total_tickets,
      type: req.body.type,
    };
    const result = await Event.create(event);
    let tickets = {
      price: req.body.price,
      event_id: result.dataValues.id,
      quantity_available: req.body.total_tickets,
    };
    console.log(result.dataValues);
    await Ticket.create(tickets);

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
