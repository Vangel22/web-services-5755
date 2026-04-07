const express = require("express");
require("dotenv").config();

const connectDb = require("./db/config");
connectDb();

const {
  getCars,
  createCar,
  updateCar,
  removeCar,
} = require("./controllers/cars");

const app = express();

app.use(express.json());

app.get("/cars", getCars);
app.post("/cars", createCar);
app.put("/cars/:id", updateCar);
app.delete("/cars/:kakosakam", removeCar);

app.listen(process.env.PORT, () =>
  console.log(`Server started at port: ${process.env.PORT}`),
);
