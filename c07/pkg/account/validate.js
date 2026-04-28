const { Validator } = require("node-input-validator");

const AccountLogin = {
  email: "required|email",
  password: "required|string",
};

const AccountRegister = {
  username: "required|string",
  email: "required|email",
  password: "required|string",
  confirmPassword: "required|string",
};

const AccountUpdate = {
  username: "string",
  email: "email",
  password: "string",
};

module.exports = {
  AccountLogin,
  AccountRegister,
  AccountUpdate,
};
