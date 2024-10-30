const router = require("express").Router();

const userRouter = require("./user");
const clothingItemsRouter = require("./clothingItems");

router.use("/users", userRouter);
router.use("/clothingItems", clothingItemsRouter);

module.exports = router;
