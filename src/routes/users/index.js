const express = require("express");
const {
  createUser,
  getUser,
  deleteUser,
  updateUser,
  getUsers,
} = require("../../resolvers/users");

const router = express.Router();

router.post("/", createUser);
router.get("/", getUser);
router.get("/:id", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/", (req, res) => {
  return res.send("User Data");
});

module.exports = router;
