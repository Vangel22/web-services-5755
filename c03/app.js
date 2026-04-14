const express = require("express");
const {
  getAllAccounts,
  createNewAccount,
  updateCurrentAccount,
  removeCurrentAccount,
} = require("./handlers/accountsController");

require("./db/config")();

const app = express();

app.use(express.json());

app.get("/accounts", getAllAccounts);
app.post("/accounts", createNewAccount);
app.put("/accounts/:id", updateCurrentAccount);
app.delete("/accounts/:id", removeCurrentAccount);

app.listen(3000, () => console.log("Server is listening at port 3000!"));
