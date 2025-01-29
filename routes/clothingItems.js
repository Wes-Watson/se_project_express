const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  validateClothingBody,
  validateUserId,
} = require("../middlewares/validation");
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

router.post("/", auth, validateClothingBody, createItem);
router.get("/", getItems);
router.delete("/:itemId", auth, validateUserId, deleteItem);
router.put("/:itemId/likes", auth, validateUserId, likeItem);
router.delete("/:itemId/likes", auth, validateUserId, unlikeItem);

module.exports = router;
