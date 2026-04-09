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

const getVehicles = async (req, res) => {
  try {
    const vehicles = await read("data.json");
    return res.status(200).send(vehicles);
  } catch (err) {
    return res.status(500).send("Internal server error!");
  }
};

const updateVehicle = async (req, res) => {
  try {
    let vehicles = await read("data.json");
    const vehicleId = Number(req.params.id); // ova proverka ni treba bidejki index (31) e od tip Number

    vehicles = vehicles.map((vehicle, index) => {
      if (vehicleId === index) {
        return {
          ...vehicle, // name: "Mercedes"
          ...req.body, // name: "Audi"
        };
      }
      return vehicle; // ako ne go napravime ovoj del ke imame null podatoci vo data.json
    });

    await write("data.json", vehicles);

    return res.status(200).send(`Vehicle ${vehicleId} updated successfully!`);
  } catch (err) {
    return res.status(500).send("Internal server error!");
  }
};

const removeVehicle = async (req, res) => {
  try {
    let vehicles = await read("data.json");
    const vehicleId = Number(req.params.id);

    vehicles = vehicles.filter((vehicle, index) => index !== vehicleId);

    await write("data.json", vehicles);
    return res.status(200).send(`Vehicle ${vehicleId} deleted successfully!`);
  } catch (err) {
    return res.status(500).send("Internal server error!");
  }
};

module.exports = {
  createVehicle,
  updateVehicle,
  getVehicles,
  removeVehicle,
};
