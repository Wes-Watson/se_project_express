const router = require("express").Router();

const userRouter = require("./user");
const clothingItemsRouter = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);
router.use((req, res, next) => {
  res.status(404).send({
    message: "Requested resource not found",
  });
});

module.exports = router;
