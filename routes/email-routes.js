const express = require("express");
const { sendEmails } = require("../controllers/emailController");

// ? Initialize router
const router = express.Router();

// ? Send email route
router.post("/send", sendEmails)

module.exports = router;