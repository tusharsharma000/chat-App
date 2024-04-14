const express = require("express");
const protectedRoute = require("../middleware/proctectedRoute");
const { getUsers } = require("../controllers/userController");

const router = express.Router();
router.get("/", protectedRoute, getUsers);

// router.post("/signUp", signUp);
// router.post("/logout", logOut);


module.exports = router;