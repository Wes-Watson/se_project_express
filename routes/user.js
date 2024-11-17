const router = require("express").Router();
const {
  getUsers,
  createUser,
  updateProfile,
  getCurrentUser,
} = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateProfile);

module.exports = router;
