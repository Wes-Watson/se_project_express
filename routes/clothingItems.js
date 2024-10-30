const router = require("express").Router();

router.get("/", () => console.log("get item"));
router.post("/", ()=> console.log("Post item"));
router.delete("/:userId", () => console.log("bye item"));

module.exports = router;