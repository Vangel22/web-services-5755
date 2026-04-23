const EventCreate = {
  title: "required|string",
  date: "required|date",
  location: "required|string",
  price: "required|integer",
  ticketsAvailable: "required|integer",
};

const EventUpdate = {
  title: "string",
  date: "date",
  location: "string",
  price: "integer",
  ticketsAvailable: "integer",
};

module.exports = {
  EventCreate,
  EventUpdate,
};
