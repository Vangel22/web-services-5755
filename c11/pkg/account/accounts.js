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

const getById = async (_id) => {
  return await Account.findOne({ _id });
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

const setNewPassword = async (_id, password) => {
  return Account.updateOne({ _id }, { $set: { password } });
};

// Delete
const removeAccount = async (_id) => {
  return await Account.deleteOne({ _id });
};

module.exports = {
  createAccount,
  getById,
  getByEmail,
  getAccounts,
  updateAccount,
  removeAccount,
  setNewPassword,
};
