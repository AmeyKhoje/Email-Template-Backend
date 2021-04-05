const express = require("express");
const { 
    getUserById,
    deleteUser,
    login,
    createUser
} = require("../controllers/user-controller");
const router = express.Router();

// Get User
router.get("/:userId", getUserById);

// Delete user
router.get("/delete/:userId", deleteUser);

// Get all records from students as well as faculty
router.get("/get-multiple/:type", () => {});

// Login service
router.post("/login", login);

// Update user
router.patch("/update/:userId", () => {});

// Create user
router.post("/create", createUser);

module.exports = router;