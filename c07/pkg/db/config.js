const mongoose = require("mongoose");

const { getSection } = require("../config/index");

const { MONGO_USERNAME, MONGO_PASSWORD } = getSection("development");

const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.12jzasd.mongodb.net/grupa-5754?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error(err);
  }
}

module.exports = connect;
// module.exports = {
//   connect
// }
