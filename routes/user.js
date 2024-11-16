const router = require("express").Router();
const {
  getUsers,
  createUser,
  getCurrentUser,
} = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth);

module.exports = router;
