const mongoose = require("mongoose");

const organizationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const Organization = mongoose.model(
  "Organization",
  organizationSchema,
  "organizations",
);

const get = async () => {
  return await Organization.find();
};

const getById = async (_id) => {
  return await Organization.findOne({ _id });
};

const getByName = (name) => {
  return await Organization.findOne({ name });
}

const create = async (data) => {
    const newOrganization = new Organization(data);
    return await newOrganization.save();
}

module.exports = {
    get,
    getById,
    getByName,
    create
}
