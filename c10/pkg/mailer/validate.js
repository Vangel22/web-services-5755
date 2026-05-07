const { Validator } = require("node-input-validator");

const MailgunFieldsWelcome = {
  to: "required|string",
  message: "required|object",
  "message.first_name": "required|string",
  "message.last_name": "required|string",
  "message.email": "required|string",
};

const MailgunFieldsPassword = {
  to: "required|string",
  message: "required|object",
  "message.first_name": "required|string",
  "message.last_name": "required|string",
  "message.link": "required|string",
};

const validate = async (data, schema) => {
  let v = new Validator(data, schema);
  let e = v.check();
  if (!e) {
    throw v.errors;
  }
};

module.exports = {
  MailgunFieldsWelcome,
  MailgunFieldsPassword,
  validate,
};
