const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ticketsAvailable: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Account",
    required: true,
  },
  organizationId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Organization",
    required: true,
  },
  attendees: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Account",
    },
  ],
});

const Event = mongoose.model("Event", eventSchema, "events");

const get = async (organizationId) => {
  return await Event.find({ organizationId })
    .populate({
      path: "attendees",
      select: "-_id email username",
    })
    .populate({
      path: "createdBy",
      select: "-_id username",
    });
};

const getById = async (_id, organizationId) => {
  return await Event.findOne({ _id, organizationId });
};

const create = async (data) => {
  const newEvent = new Event(data);
  return await newEvent.save();
};

const update = async (_id, organizationId, data) => {
  return await Event.updateOne({ _id, organizationId }, data);
  // Pronajdi go eventot so id=12345 i organizationId=54321 i promeni gi negovite podatoci
  // klucnata bukva e "i" kadesto i id i organizationId mora da postojat
};

const remove = async (_id, organizationId) => {
  return await Event.deleteOne({ _id, organizationId });
};

//http://karti.com.mk/eTickets/TicketList.aspx?pEventID=7581
const addAttendee = async (eventId, organizationId, accountId) => {
  return await Event.updateOne(
    { _id: eventId, organizationId }, // filter
    { $push: { attendees: accountId } }, // set
  );
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
  addAttendee,
};
