const express = require("express");

const app = express();

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("connected to DB");
  })
  .catch(console.error);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
