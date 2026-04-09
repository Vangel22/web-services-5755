const express = require("express");
const {
  getVehicles,
  createVehicle,
  updateVehicle,
  removeVehicle,
} = require("./handlers/vehicle");

const app = express();

app.use(express.json());

// TODO: Popolnete gi rutite soodvetno so kontrolerite
app.get("/vehicles", getVehicles);
app.post("/vehicles", createVehicle);
app.put("/vehicles/:id", updateVehicle);
app.delete("/vehicle/:id", removeVehicle);

app.listen(3000, () => console.log("Server started at port 3000!"));
