const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");

router.post("/user/:id/role", roleController.postRole);
router.get("/user/:id/role", roleController.getRole);
router.put("/user/:id/role", roleController.putRole);

module.exports = router;
