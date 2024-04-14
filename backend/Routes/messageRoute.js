const express = require("express");
const { sendMessage, getMessages } = require("../controllers/messagesController");
const protectedRoute = require("../middleware/proctectedRoute");
// const { login, signUp, logOut } = require("../controllers/authController");

const router = express.Router();
router.post("/send/:id", protectedRoute, sendMessage);
router.get("/:id", protectedRoute, getMessages);

// router.post("/signUp", signUp);
// router.post("/logout", logOut);


module.exports = router;