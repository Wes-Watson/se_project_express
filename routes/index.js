const router = require("express").Router();

const userRouter = require("./user");
const clothingItemsRouter = require("./clothingItems");
const { err404 } = require("../utils/errors");
const { login, createUser } = require("../controllers/users");
const {
  validateUserLogin,
  validateUserBody,
} = require("../middlewares/validation");
const NotFoundError = require("../errors/NotFoundError");

router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);
router.post("/signin", validateUserLogin, login);
router.post("/signup", validateUserBody, createUser);
router.use((req, res, next) => {
  next(new NotFoundError(err404.message));
});

module.exports = router;
