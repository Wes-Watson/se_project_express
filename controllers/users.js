const User = require("../models/user");
const { err400, err401, err404, err409, err500 } = require("../utils/errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(err500.status).send({ message: err500.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  if (!email || !password) {
    return res
      .status(err400.status)
      .send({ message: "Email and Password are Required" });
  }

  return bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) =>
      User.create({ name, avatar, email, password: hashedPassword }),
    )
    .then((user) => {
      res.status(201).send({
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(err400.status).send({ message: err400.message });
      } else if (err.code === 11000) {
        res
          .status(err409.status)
          .send({ message: "This Email Already Exists" });
      } else {
        res.status(err500.status).send({ message: err500.message });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(err400.status)
      .send({ message: "Email and Password are Required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        res
          .status(err401.status)
          .send({ message: "Incorrect Email or Password" });
      } else {
        console.log(err.message);
        res.status(err500.status).send({ message: err500.message });
      }
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      const { _id, email, avatar, name } = user;
      res.status(200).send({ _id, email, avatar, name });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res.status(err404.status).send({ message: err404.message });
      } else if (err.name === "CastError") {
        res.status(err400.status).send({ message: err400.message });
      } else {
        res.status(err500.status).send({ message: err500.message });
      }
    });
};

const updateProfile = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      const { _id, email } = user;
      res
        .status(200)
        .send({ _id, email, avatar: user.avatar, name: user.name });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res.status(err404.status).send({ message: err404.message });
      } else if (err.name === "ValidationError") {
        res.status(err400.status).send({ message: err400.message });
      } else {
        res.status(err500.status).send({ message: err500.message });
      }
    });
};

module.exports = { getUsers, createUser, getCurrentUser, login, updateProfile };
