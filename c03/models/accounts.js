const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const Account = mongoose.model("Account", accountSchema, "accounts");

// Create

// Read

// Update

// Delete
