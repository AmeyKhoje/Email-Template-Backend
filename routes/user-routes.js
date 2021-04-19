const express = require("express");
const { 
    getUserById,
    deleteUser,
    login,
    createUser
} = require("../controllers/user-controller");
const { 
    body,
    validationResult } = require('express-validator');
const { checkAuth } = require("../middlewares/check-auth");


const router = express.Router();

// ? Get User
router.get("/single-user", checkAuth, getUserById);

// ? Delete user
router.delete("/delete/self", checkAuth, deleteUser);

// ? Get all records from students as well as faculty
router.get("/get-multiple/:type/all", () => {});

// ? Login service
router.post("/login", login);

// ? Update user
router.patch("/update/:userId", () => {});

// ? Create user
router.post(
    "/create",
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8, max: 20 }),
    body("mobile").isLength({ min: 10, max: 13 }),
    (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.json({ isValidationError: true, errors: errors.array() });
        }

        createUser(req, res)
    }
);

module.exports = router;