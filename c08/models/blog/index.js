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

// Pronajdi gi site postovi za odreden korisnik koj gi ima napraveno
const getAllByUser = async (createdBy) => {
  return await Post.find({ createdBy }).populate({
    path: "createdBy",
    select: "username",
  });
};

// proverkata ke bide kaj handlerot
const getSingle = async (_id) => {
  return await Post.findOne({ _id });
};

// ke vnimavame vo handlerot
const create = async (data) => {
  const newPost = new Post(data);
  return await newPost.save();
};

// ke vnimavame vo handlerot
const update = async (_id, data) => {
  return await Post.updateOne({ _id }, data);
};

// ke vnimavame vo handlerot
const remove = async (_id) => {
  return await Post.deleteOne({ _id });
};

module.exports = {
  getAllByUser,
  getSingle,
  create,
  update,
  remove,
};
