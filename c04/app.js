const express = require("express");

const connectDB = require("./pkg/db/config");
connectDB();
const { getSection } = require("./pkg/config/index");

const app = express();

app.use(express.json());

app.listen(getSection("development").port, () =>
  console.log(`Server started at port ${getSection("development").port}`),
);
