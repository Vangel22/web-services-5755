const express = require("express");

require("./db/config")();

const app = express();

app.use(express.json());

app.listen(3000, () => console.log("Server is listening at port 3000!"));
