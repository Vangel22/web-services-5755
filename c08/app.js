const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
// file upload
const fileUplaod = require("express-fileupload");

require("./db/config")();
const { getSection } = require("./config/index");
const { login, register } = require("./controllers/auth");
const {
  getAllPosts,
  createPost,
  updatePost,
  removePost,
} = require("./controllers/posts");
const { upload, download } = require("./controllers/storage");
// storage controllers
// blog controllers

const app = express();
app.use(express.json());

app.use(
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: ["/auth/login", "/auth/register"],
  }),
);

// file upload middleware
app.use(fileUplaod());

// Auth controllers

app.post("/auth/login", login);
app.post("/auth/register", register);

// Blog posts controller

app.get("/posts", getAllPosts);
app.post("/posts", createPost);
app.put("/posts/:id", updatePost);
app.delete("/posts/:id", removePost);

// Storage controller

app.post("/upload", upload);
app.get("/download/:filename", download);

app.listen(getSection("development").port, () => {
  console.log(`Server started on port ${getSection("development").port}!`);
});
