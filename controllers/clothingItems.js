const ClothingItem = require("../models/clothingItem");
const { err400, err404, err500 } = require("../utils/errors");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res.status(err500.status).send({ message: err.message });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.status(201).send({ data: item });
    })
    .catch((err) => {
      console.error(err.name);
      if (err.name === "ValidationError") {
        res.status(err400.status).send({ message: err.message });
      } else {
        return res.status(err500.status).send({ message: err.message });
      }
      return err;
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) =>
      item
        .remove()
        .then(() => res.status(200).send({ message: "Item Deleted" }))
    )
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res.status(err404.status).send({ message: err404.message });
      } else if (err.name === "CastError") {
        res.status(err400.status).send({ message: err400.message });
      } else {
        return res.status(err500.status).send({ message: err.message });
      }
      return err;
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then((like) => {
      res.status(200).send(like);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(err400.status).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(err400.status).send({ message: err400.message });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(err404.status).send({ message: err404.message });
      } else {
        res.status(err500.status).send({ message: err.message });
      }
      return err;
    });
};

const unlikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((unlike) => {
      res.status(200).send(unlike);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(err400.status).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(err400.status).send({ message: err400.message });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(err404.status).send({ message: err404.message });
      } else {
        res.status(err500.status).send({ message: err.message });
      }
      return err;
    });
};

module.exports = { getItems, createItem, deleteItem, likeItem, unlikeItem };
