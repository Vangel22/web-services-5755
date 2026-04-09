const { create, get, update, remove } = require("../models/vehicles");

// POST - req.body e napisan vo POSTMAN od strana na klientot
const createVehicle = async (req, res) => {
  try {
    const newVehicle = await create(req.body);
    return res.status(200).send(newVehicle);
  } catch (err) {
    return res.status(500).send("Invalid server error!");
  }
};

const getVehicles = async (req, res) => {
  try {
    const vehicles = await get();
    return res.status(200).send(vehicles);
  } catch (err) {
    return res.status(500).send("Invalid server error!");
  }
};

// PUT - req.body - klientot ni ispraka novi podatoci za nekoe vozilo pr. broj 1 da se promeni nekoj negov podatok
const updateVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const dataToChange = req.body;

    const updatedVehicle = await update(vehicleId, dataToChange);
    return res.status(200).send(updatedVehicle);
  } catch (err) {
    return res.status(500).send("Invalid server error!");
  }
};

// DELETE - req.body (optional)
const removeVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;

    const deletedVehicle = await remove(vehicleId);
    return res.status(200).send(deletedVehicle);
  } catch (err) {
    return res.status(500).send("Invalid server error!");
  }
};

module.exports = {
  createVehicle,
  getVehicles,
  updateVehicle,
  removeVehicle,
};
