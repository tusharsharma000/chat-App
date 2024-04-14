const express = require("express");
const { login, signUp, logOut } = require("../controllers/authController");

const router = express.Router();
router.post("/login", login);
router.post("/signUp", signUp);
router.post("/logout", logOut);


module.exports = router;