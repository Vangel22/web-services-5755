const express = require("express");

const connect = require("./db/config");
connect();

const {
  createVehicle,
  getVehicles,
  updateVehicle,
  removeVehicle,
} = require("./controllers/vehiclesController");

const app = express();

app.use(express.json());

app.get("/vehicles", getVehicles);
app.post("/vehicles", createVehicle);
app.put("/vehicles/:id", updateVehicle);
app.delete("/vehicles/:id", removeVehicle);

app.listen(3000, () => console.log("Server started!"));
