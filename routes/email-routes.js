const express = require("express");
const { sendEmails, getAllEmailsSentByMe, makeEmailStarred, getAllEmailsReceived } = require("../controllers/emailController");
const { checkAuth } = require("../middlewares/check-auth");

// ? Initialize router
const router = express.Router();

// ? Send email route
router.post("/send",checkAuth, sendEmails);

// ? Get all emails sent by user
router.get("/all", checkAuth, getAllEmailsSentByMe);

// ? Get all received emails
router.get("/my", checkAuth, getAllEmailsReceived);

// ? Make email starred
router.patch("/starred", checkAuth, makeEmailStarred)

module.exports = router;