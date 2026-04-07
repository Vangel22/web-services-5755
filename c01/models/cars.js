const mongoose = require("mongoose");
// Model za avtomobili

// Baranje: sekoj avtomobil ima:
// godina, kilometraza, boja, tip na gorivo, karoserija ( karavan, kupe, kabriolet, suv ),
// tip na menuvac, brend, model.

const carSchema = mongoose.Schema(
  {
    brand: String,
    model: String,
    year: Number,
    mileage: Number,
    paint: String,
    gasType: {
      type: String,
      enum: ["diesel", "petrol", "lpg", "electric"],
    },
    isHybrid: Boolean,
    bodyType: {
      type: String,
      enum: ["coupe", "hatchback", "carbio", "SUV"],
    },
    transmission: {
      type: String,
      enum: ["manual", "automatic"],
    },
  },
  { timestamps: true },
);

const CarModel = mongoose.model("Car", carSchema, "cars");

// Create

const create = async (carData) => {
  console.log(carData);
  const newCar = new CarModel(carData);
  return await newCar.save();
};

// Read

const getAll = async () => {
  return await CarModel.find();
};

// Update

const update = async (_id, cardData) => {
  return await CarModel.updateOne({ _id }, carData);
};

// Delete
// Ako imeto na vrednosta i klucot se isti, nemora da go povtoruvame _id: _id -> samo _id e dovolno
// const remove = async (_id) => {
//   return await CarModel.deleteOne({ _id });
// };

const remove = async (kakosakam) => {
  return await CarModel.deleteOne({ _id: kakosakam });
};

module.exports = {
  create,
  update,
  getAll,
  remove,
};
