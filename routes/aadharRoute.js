const express = require("express");
const router = express.Router();
const aadharController = require("../controllers/aadharController");

router.post("/users/:id/aadhar", aadharController.postAadhar);
router.get("/users/:id/aadhar", aadharController.getAadharForParticularUser);

module.exports = router;
