const router = require("express").Router();

const userRouter = require("./user");
const clothingItemsRouter = require("./clothingItems");
const { err404 } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);
router.use((req, res) => {
  res.status(err404.status).send({
    message: "Requested resource not found",
  });
});

module.exports = router;
