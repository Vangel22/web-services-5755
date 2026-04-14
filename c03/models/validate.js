const { Validator } = require("node-input-validator");

// data -> req.body , schema -> Account Schema

const AccountCreate = {
  username: "required|string",
  email: "required|email",
  password: "required|string",
  // year: "required|integer",
};

// required ne treba da imame ovde za da ima fleksibilnost sekoe pole pri promena
// ako imame required kaj password toa znaci deka pri sekoj
// update na email ili username ke morame i password prisilno da go menuvame
const AccountUpdate = {
  username: "string",
  email: "email",
  password: "string",
};

// data = req.body, schema = AccountCreate, AccountUpdate
const validateAccount = async (data, schema) => {
  const validator = new Validator(data, schema);
  const validationChecker = await validator.check();
  // ako validationChecker e true toa znaci deka nemalo greska
  // ako validationChecker e false toa znaci deka ima greska

  if (!validationChecker) {
    throw {
      code: 400,
      error: "Greska na klient!",
    };
  }
};

module.exports = {
  AccountCreate,
  AccountUpdate,
  validateAccount,
};
