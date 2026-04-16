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

const validateAccount = async (data, schema) => {
  const validator = new Validator(data, schema);
  const validationChecker = await validator.check();

  if (!validationChecker) {
    throw {
      code: 400,
      error: "Greska na klient!",
    };
  }
};

module.exports = {
  AccountLogin,
  AccountRegister,
  AccountUpdate,
  validateAccount,
};
