const mongoose = require("mongoose");

const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_CLUSTER,
  MONGODB_DB_NAME,
  MONGODB_OPTIONS,
} = process.env;

// process.env.MONGODB_USERNAME

const URI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}/${MONGODB_DB_NAME}?${MONGODB_OPTIONS}`;

const connectDb = async () => {
  try {
    mongoose.connect(URI);
    console.log("MongoDB connected!");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;
