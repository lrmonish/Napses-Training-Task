const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/users", userController.postUser);
router.get("/users", userController.getUser);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.putUsersById);
router.delete("/users/:id", userController.deleteUser);
module.exports = router;
