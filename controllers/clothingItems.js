const clothingItem = require("../models/clothingItem");
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
        return res.status(err400.status).send({ message: err.message });
      }
      return res.status(err500.status).send({ message: err.message });
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
      console.error(err.name);
      if (err.name === "DocumentNotFoundError") {
        return res.status(err404.status).send({ message: err404.message });
      }
      if (err.name === "CastError") {
        return res.status(err400.status).send({ message: err400.message });
      }
      return res.status(err500.status).send({ message: err.message });
    });
};

module.exports = { getItems, createItem, deleteItem };