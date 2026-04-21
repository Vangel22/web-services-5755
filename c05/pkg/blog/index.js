const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  createdBy: {
    immutable: true,
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Account",
  },
});

// Eden post primer:
// title: "Title 1"
// content: "Content 1"
// createdBy: ObjectId('69e7c0fbbdd565a8e0b369cd')

const Post = mongoose.model("Post", postSchema, "posts");

const getAllByUser = async (createdBy) => {
  return await Post.find({ createdBy });
  //   .populate({
  //     path: "createdBy",
  //     select: "username",
  //   });
};

const getSingle = async () => {};

const create = async () => {};

const update = async () => {};

const remove = async () => {};

module.exports = {
  getAllByUser,
  getSingle,
  create,
  update,
  remove,
};
