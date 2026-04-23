const express = require("express");
const { expressjwt } = require("express-jwt");

const connectDB = require("./pkg/db/config");
connectDB();
const { getSection } = require("./pkg/config/index");
const { login, register } = require("./handlers/auth");
const {
  getAllPosts,
  createPost,
  updatePost,
  removePost,
} = require("./handlers/posts");

const app = express();

app.use(express.json());

app.use(
  expressjwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: ["/auth/login", "/auth/register"],
  }),
);

app.post("/auth/login", login);
app.post("/auth/register", register);

app.get("/posts", getAllPosts);
app.post("/posts", createPost);
app.put("/posts/:id", updatePost);
app.delete("/posts/:id", removePost);

app.listen(getSection("development").port, () =>
  console.log(`Server started at port ${getSection("development").port}`),
);
