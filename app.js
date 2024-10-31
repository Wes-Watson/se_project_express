const express = require("express");

const app = express();

const mongoose = require("mongoose");

const mainRouter = require("./routes/index.js");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("connected to DB");
  })
  .catch(console.error);

app.use((req, res, next) => {
  req.user = {
    _id: "6723b4f91d07e3e0b7f5604b",
  };
  next();
});

const { PORT = 3001 } = process.env;

app.use(express.json());

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
