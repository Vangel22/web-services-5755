const mongoose = require("mongoose");

const URI = "";

async function connectDb() {
  try {
    await mongoose.connect(URI);
    console.log("Connection successful!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDb;
