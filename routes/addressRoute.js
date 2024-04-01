const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");

router.post("/users/:id/addresses", addressController.postAddressForUser);
router.get("/users/:id/addresses", addressController.getAddressesForUser);
router.get(
  "/users/:id/addresses/:addressid",
  addressController.getAddressesForUserAndAddressId
);
router.put(
  "/users/:id/addresses/:addressid",
  addressController.putAddressByUserIdAndAddressId
);

module.exports = router;
