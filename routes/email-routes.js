const express = require("express");
const { sendEmails, getAllEmailsSentByMe, makeEmailStarred, getAllEmailsReceivedByStudent, getAllEmailsReceivedByAdmin } = require("../controllers/emailController");
const { checkAuth } = require("../middlewares/check-auth");
const { roleRoute } = require("../middlewares/role-route");

// ? Initialize router
const router = express.Router();

// ? Send email route
router.post("/send",checkAuth, sendEmails);

// ? Get all emails sent by user
router.get("/all", checkAuth, getAllEmailsSentByMe);

// ? Get all received emails
router.get("/student/received",  getAllEmailsReceivedByStudent);

router.get("/admin/received",  getAllEmailsReceivedByAdmin);

// ? Make email starred
router.patch("/starred", checkAuth, makeEmailStarred)

router.get("/get-received-emails", [checkAuth, roleRoute], (req, res, next) => {
    res.json({ isError: true, message: "Something went wrong" })
});

module.exports = router;