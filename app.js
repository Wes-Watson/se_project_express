const express = require("express");

const app = express();

const mongoose = require("mongoose");

const cors = require("cors");

const mainRouter = require("./routes/index");

const { login, createUser } = require("./controllers/users");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {})
  .catch(console.error);

const { PORT = 3001 } = process.env;

app.use(express.json());
app.use(cors());

app.post("/signin", login);
app.post("/signup", createUser);

app.use("/", mainRouter);

app.listen(PORT, () => {});
