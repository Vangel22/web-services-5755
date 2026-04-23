const express = require("express");
const { expressjwt } = require("express-jwt");

const connectDB = require("./pkg/db/config");
connectDB();
const { getSection } = require("./pkg/config/index");
const { login, register } = require("./handlers/auth");
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  joinEvent,
} = require("./handlers/events");

const app = express();

app.use(express.json());

app.use(
  expressjwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: ["/auth/login", "/auth/register"],
  }),
);

app.get("/events", getAllEvents);
app.get("/events/:id", getEventById);
app.post("/events", createEvent);
app.put("/events/:id", updateEvent);
app.delete("/events/:id", deleteEvent);
app.post("/join/:id/:attendeeId", joinEvent);

app.post("/auth/login", login);
app.post("/auth/register", register);

app.listen(getSection("development").port, () =>
  console.log(`Server started at port ${getSection("development").port}`),
);
