const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
// file upload

require("./db/config")();
const { getSection } = require("./config/index");
const { login, register } = require("./controllers/auth");
// storage controllers
// blog controllers

const app = express();
app.use(express.json());

app.use(
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: ["/auth/login", "/auth/register"],
  }),
);

// file upload middleware

// Auth controllers

app.post("/auth/login", login);
app.post("/auth/register", register);

app.listen(getSection("development").port, () => {
  console.log(`Server started on port ${getSection("development").port}!`);
});
