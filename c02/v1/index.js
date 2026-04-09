const express = require("express");

const app = express();

app.use(express.json());

// TODO: Popolnete gi rutite soodvetno so kontrolerite
app.get();
app.post();
app.put();
app.delete();

app.listen(3000, () => console.log("Server started at port 3000!"));
