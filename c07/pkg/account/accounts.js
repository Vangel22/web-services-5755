const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

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
