const { validateSchema } = require("../helper/validation");
const {
  get,
  getById,
  create,
  update,
  remove,
  addAttendee,
} = require("../pkg/event/index");
const { EventCreate, EventUpdate } = require("../pkg/event/validate");

const getAllEvents = async (req, res) => {
  try {
    // req.auth e definirano vo payload vo tokenot
    // mozeme da go vidime ova na linija 46 vo auth.js
    const events = await get(req.auth.organizationId);
    return res.status(200).send(events);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid Server Error");
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params; // id na event
    const event = await getById(id, req.auth.organizationId);

    if (!event) {
      return res.status(404).send("Event not found!");
    }

    return res.status(200).send(event);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid Server Error");
  }
};

const createEvent = async (req, res) => {
  try {
    await validateSchema(req.body, EventCreate);
    // createdBy, organizationId

    const data = {
      ...req.body,
      createdBy: req.auth.id, // vo event schema, cretedBy ni e definicijata za ova pole, moze da bide sto drugo sakame, primer napravenoOd
      organizationId: req.auth.organizationId, // istoto vazi i ovde, moze da bide samo organization
    };

    const newEvent = await create(data);
    return res.status(200).send(newEvent);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid Server Error");
  }
};

const updateEvent = async (req, res) => {
  try {
    // req.params.id doagja od dinamicniot parametar na rutata i e namenet za id na modelot koj go prebaruvame t.e Event
    // req.auth.id - e id-to na korisnikot koj go isprakja baranjeto do ovaa ruta - PUT baranje
    await validateSchema(req.body, EventUpdate);
    const updatedEvent = await update(
      req.params.id,
      req.auth.organizationId,
      req.body,
    );

    return res.status(200).send(updatedEvent);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid Server Error");
  }
};

const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await remove(req.params.id, req.auth.organizationId);
    return res.status(200).send(deletedEvent);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid Server Error");
  }
};

const joinEvent = async (req, res) => {
  try {
    const { id, attendeeId } = req.params; // eventId i id na toj sto treba da prisistvuva kako attendeeId
    const userId = req.auth.id; // toj sto isprakja baranje do ovaa ruta

    const event = await getById(id, req.auth.organizationId);

    if (!event) {
      return res.status(404).send("Event not found!");
    }

    if (event.createdBy.toString() !== userId.toString()) {
      return res.status(400).send("You are not the owner of this event!");
    }

    // ticketsAvailable treba da se namaluva na sekoj joined attendee
    if (event.ticketsAvailable <= event.attendees.length) {
      return res.status(400).send("Not enough tickets!");
    }

    await addAttendee(id, req.auth.organizationId, attendeeId);
    return res.status(200).send("Successfully joined the event!");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid Server Error");
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  joinEvent,
};
