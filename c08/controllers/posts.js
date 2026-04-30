const { validateSchema } = require("../helper/validation");
const {
  getAllByUser,
  update,
  create,
  getSingle,
  remove,
} = require("../models/blog");
const { BlogCreate, BlogUpdate } = require("../models/blog/validate");

const getAllPosts = async (req, res) => {
  try {
    // req.auth -> momentalno najaveniot korisnik t.e toj sto isprakja baranje
    const userPosts = await getAllByUser(req.auth.id);
    return res.status(200).send(userPosts);
  } catch (err) {
    return res.status(500).send("Invalid server error");
  }
};

const createPost = async (req, res) => {
  try {
    // toj sto ja povikuva rutata mora da bide avtenticiran
    // i da ima token payload vo req.auth
    await validateSchema(req.body, BlogCreate);
    // req.body -> title, content
    const data = {
      ...req.body, //title i content
      createdBy: req.auth.id, // toj sto isprakja baranje za da napravi nov post
    };

    // data: {
    // title: "Test"
    // content: "Content"
    // createdBy: "12345abcdef"
    // }

    const newPost = await create(data);
    return res.status(200).send(newPost);
  } catch (err) {
    return res.status(500).send("Invalid server error");
  }
};

const updatePost = async (req, res) => {
  try {
    await validateSchema(req.body, BlogUpdate);

    const checkPost = await getSingle(req.params.id);

    if (!checkPost) {
      return res.status(404).send("Post not found!");
    }

    if (checkPost.createdBy.toString() !== req.auth.id.toString()) {
      return res.status(400).send("User is not author of this post!");
    }

    const newPostData = await update(req.params.id, req.body);

    return res.status(200).send(newPostData);
  } catch (err) {
    return res.status(500).send("Invalid server error");
  }
};

const removePost = async (req, res) => {
  try {
    const checkPost = await getSingle(req.params.id);

    if (!checkPost) {
      return res.status(404).send("Post not found!");
    }

    if (checkPost.createdBy.toString() !== req.auth.id.toString()) {
      return res.status(400).send("User is not author of this post!");
    }

    const deletedPost = await remove(req.params.id);

    return res.status(200).send(deletedPost);
  } catch (err) {
    return res.status(500).send("Invalid server error");
  }
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  removePost,
};
