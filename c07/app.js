const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const fileUpload = require("express-fileupload");

const connectDB = require("./pkg/db/config"); // connect funkcijata vo /pkg/db/config
connectDB();
// const { connect } = require('./pkg/db/config')
// const connectDB = require("./pkg/db/config");
// connectDB.connect();
const { getSection } = require("./pkg/config/index");
const { login, register } = require("./handlers/auth");
const { upload, download } = require("./handlers/storage");

const app = express();
app.use(express.json()); // req.body ke moze da bide vo JSON format

app.use(
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: ["/auth/login", "/auth/register"],
  }),
);

app.use(fileUpload());

app.post("/auth/login", login);
app.post("/auth/register", register);

app.post("/upload", upload);
app.get("/download/:filename", download);

app.listen(getSection("development").port, () => {
  console.log(`Server started at port ${getSection("development").port}`);
});
