const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

const connect = require("./pkg/db/config");
connect(); // mongodb is running

const { getSection } = require("./pkg/config");
const {
  sendWelcomeEmail,
  sendPasswordResetMail,
} = require("./handlers/mailgun");
const {
  login,
  register,
  resetPassword,
  resetPasswordTemplate,
  forgotPassword,
} = require("./handlers/auth");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(
  "/api", // gi proveruva site ruti koi pocnuvaat so /api dali imaat Bearer token vo Authorization header
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/api/auth/login",
      "/api/auth/register",
      "/api/auth/forgot-password",
      "/api/welcome",
      "/api/reset",
    ],
  }),
);

app.post("/api/auth/login", login);
app.post("/api/auth/register", register);

app.post("/api/welcome", sendWelcomeEmail);
app.post("/api/reset", sendPasswordResetMail);

app.get("/reset-password/:id/:token", resetPasswordTemplate); // ke ni go pokaze resest-password.ejs
app.post("/reset-password/:id/:token", resetPassword);

app.get("/forgot-password", (req, res) => {
  // ke ni go prikaze forgot-password.ejs
  res.render("forgot-password");
});
app.post("/api/auth/forgot-password", forgotPassword);

// Pateka
// 1. GET - forgot-password
// 2. POST - forgot-password - ni dava link kon resetPasswordTemplate
// 3. GET - reset-password/:id/:token - se povikuva resetPasswordTemplate
// 4. POST - reset-password/:id/:token - lozinkata e uspesno promeneta

app.listen(getSection("development").port, () => {
  console.log(`Server started at port ${getSection("development").port}`);
});
