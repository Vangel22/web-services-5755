const express = require("express");
require("dotenv").config();

const { sendMessage } = require("./handlers/mailer");

const api = express();
api.use(express.json());

api.post("/api/v1/send-msg", sendMessage);

api.listen(process.env.PORT, (err) => {
  err
    ? console.log(err)
    : console.log(`Server started on port ${process.env.PORT}`);
});
