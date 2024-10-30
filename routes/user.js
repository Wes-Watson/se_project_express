const router = require("express").Router();

router.get("/", () => console.log("get user"));
router.get("/:userId", () => console.log("sup"));
router.post("/", () => console.log("Post itemr"));

module.exports = router;
