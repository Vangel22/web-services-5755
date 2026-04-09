const { read, write } = require("../read-write");

// TODO: Dopolnete gi funkciite za CRUD funkcionalnost

const createVehicle = async (req, res) => {
  try {
    const vehicles = await read("data.json");
    vehicles.push(req.body);
    await write("data.json", vehicles);

    return res.status(200).send("New vehicle added!");
  } catch (err) {
    return res.status(500).send("Internal server error!");
  }
};

const getVehicles = async () => {};

const updateVehicle = async () => {};

const removeVehicle = async () => {};

module.exports = {};
