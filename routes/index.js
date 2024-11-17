const router = require("express").Router();

const userRouter = require("./user");
const clothingItemsRouter = require("./clothingItems");
const { err404 } = require("../utils/errors");
const { login, createUser } = require("../controllers/users");

router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);
router.post("/signin", login);
router.post("/signup", createUser);
router.use((req, res) => {
  res.status(err404.status).send({
    message: "Requested resource not found",
  });
});


module.exports = router;
