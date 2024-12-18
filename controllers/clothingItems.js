const ClothingItem = require("../models/clothingItem");
const { err400, err404, err403, err500 } = require("../utils/errors");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res.status(err500.status).send({ message: err500.message });
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
        res.status(err400.status).send({ message: err400.message });
      } else {
        res.status(err500.status).send({ message500: err.message });
      }
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log();
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id.toString()) {
        res.status(err403.status).send({ message: err403.message });
      } else {
        item
          .remove()
          .then(() => res.status(200).send({ message: "Item Deleted" }));
      }
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

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .orFail()
    .then((like) => {
      res.status(200).send(like);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(err400.status).send({ message: err400.message });
      } else if (err.name === "CastError") {
        res.status(err400.status).send({ message: err400.message });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(err404.status).send({ message: err404.message });
      } else {
        res.status(err500.status).send({ message: err500.message });
      }
    });
};

const unlikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((unlike) => {
      res.status(200).send(unlike);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(err400.status).send({ message: err400.message });
      } else if (err.name === "CastError") {
        res.status(err400.status).send({ message: err400.message });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(err404.status).send({ message: err404.message });
      } else {
        res.status(err500.status).send({ message: err500.message });
      }
    });
};

module.exports = { getItems, createItem, deleteItem, likeItem, unlikeItem };
