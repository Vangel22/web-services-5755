const express = require("express");

const { getSection } = require("./pkg/config");
// sendWelcomeMail
// sendPasswordResetMail
const {
  sendWelcomeEmail,
  sendPasswordResetMail,
} = require("./handlers/mailgun");

const app = express();
app.use(express.json());

app.post("/api/welcome", sendWelcomeEmail);
app.post("/api/reset", sendPasswordResetMail);

app.listen(getSection("development").port, () => {
  console.log(`Server started at port ${getSection("development").port}`);
});
