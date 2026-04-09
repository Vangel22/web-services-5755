const mongoose = require("mongoose");

const URI =
  "mongodb+srv://Vangel22:test1234@cluster0.12jzasd.mongodb.net/grupa-5754?appName=Cluster0";

async function connectDb() {
  try {
    await mongoose.connect(URI);
    console.log("Connection successful!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDb;
