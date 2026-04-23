const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  logSuccess: {
    type: Number,
    default: 0,
  },
  logFail: {
    type: Number,
    default: 0,
  },
  // organizationId se popolnuva vo momentot na registracija:
  //  - preku /auth/register (kreiranje na nova organizacija)
  organizationId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Organization",
    required: true,
  },
});

// Account - Organization - Event

const Account = mongoose.model("Account", accountSchema, "accounts");

// Create
const createAccount = async (accountData) => {
  const newAccount = new Account(accountData);
  return await newAccount.save();
};

const getByEmail = async (email) => {
  return await Account.findOne({ email });
};

// Read
const getAccounts = async () => {
  return await Account.find();
};

// Update
const updateAccount = async (_id, accountData) => {
  return await Account.updateOne({ _id }, accountData);
};

// const logSuccess = async (_id, count) => {
//   return await Account.updateOne({ _id }, { $set: { logSuccess: count } })
// }

// const logFail = async (_id, count) => {
//   return await Account.updateOne({ _id }, { $set: { logFail: count } })
// }

// Delete
const removeAccount = async (_id) => {
  return await Account.deleteOne({ _id });
};

module.exports = {
  createAccount,
  getByEmail,
  getAccounts,
  updateAccount,
  removeAccount,
};
