const { Validator } = require("node-input-validator");

const validateSchema = async (data, schema) => {
  const validator = new Validator(data, schema);
  const validationChecker = await validator.check();

  if (!validationChecker) {
    throw {
      code: 400,
      error: "Greska na klient!",
    };
  }
};
