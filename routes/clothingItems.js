const router = require("express").Router();
const { getItems, createItem } = require("../controllers/clothingItems");

router.post("/", createItem);
router.get("/", getItems);
router.delete("/:userId", getItems);

module.exports = router;
