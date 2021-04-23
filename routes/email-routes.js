const express = require("express");
const { sendEmails, getAllEmailsSentByMe, makeEmailStarred } = require("../controllers/emailController");
const { checkAuth } = require("../middlewares/check-auth");

// ? Initialize router
const router = express.Router();

// ? Send email route
router.post("/send",checkAuth, sendEmails);

// ? Get all emails sent by user
router.get("/all", checkAuth, getAllEmailsSentByMe);

// ? Make email starred
router.patch("/starred", checkAuth, makeEmailStarred)

module.exports = router;