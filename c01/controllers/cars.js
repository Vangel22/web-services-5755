const { create, getAll, update, remove } = require("../models/cars");

const createCar = async (req, res) => {
  try {
    const newCar = await create(req.body);
    return res.status(200).send(newCar);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid server error");
  }
};

const getCars = async (req, res) => {
  try {
    const allCars = await getAll();
    return res.status(200).send(allCars);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid server error");
  }
};

const updateCar = async (req, res) => {
  try {
    const updateCar = await update(req.params.id, req.body);
    return res.status(200).send(updateCar);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid server error");
  }
};

const removeCar = async (req, res) => {
  try {
    const removedCar = await remove(req.params.kakosakam);
    return res.status(200).send(removedCar);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid server error");
  }
};

module.exports = {
  createCar,
  updateCar,
  getCars,
  removeCar,
};
