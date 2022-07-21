const express = require("express");
// we need to bring methods so we will use destructuring.
const { createSOS, getSOS, updateStatus } = require("../controllers/sosRequest");

const { protect } = require("../middleware/auth");
const router = express.Router();

router.route("/").post(protect, createSOS).get(getSOS);

router.route("/:id").put(updateStatus)

module.exports = router;
