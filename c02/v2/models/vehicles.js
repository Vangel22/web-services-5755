const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["car", "truck", "motorcycle"],
    },
    bodyType: {
      type: String,
      default: "",
      enum: ["hatchback", "SUV", "cabrio"],
    },
    brand: String,
    model: String,
    year: Number,
    mileage: Number,
    color: String,
    fuelType: {
      type: String,
      enum: ["diesel", "petrol", "electric", "hybrid"],
    },
    transmission: {
      type: String,
      enum: ["automatic", "semi-automatic", "manual"],
    },
  },
  { timestamps: true },
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema, "vehicles");

// Create - .save() ili insertOne
const create = async (data) => {
  const newVehicle = new Vehicle(data);
  return await newVehicle.save();
};

// Read - find ili findOne
const get = async () => {
  return await Vehicle.find();
};

// get by brand

// get by year

// Update - updateOne

const update = async (_id, data) => {
  return await Vehicle.updateOne({ _id }, data);
};

// Delete - deleteOne

const remove = async (_id) => {
  return await Vehicle.deleteOne({ _id });
};

module.exports = {
  create,
  get,
  update,
  remove,
};
