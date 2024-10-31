const User = require("../models/user");
const { err400, err404, err500 } = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(err500.status).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(err400.status).send({ message: err.message });
      } else {
        res.status(err500.status).send({ message: err.message });
      }
      return err;
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res.status(err404.status).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(err400.status).send({ message: err.message });
      } else {
        res.status(err500.status).send({ message: err.message });
      }
      return err;
    });
};

module.exports = { getUsers, createUser, getUser };
