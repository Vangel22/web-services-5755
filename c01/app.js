const express = require("express");
require("dotenv").config();

const connectDb = require("./db/config");
connectDb();

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello World!");
});

app.listen(process.env.PORT, () =>
  console.log(`Server started at port: ${process.env.PORT}`),
);
