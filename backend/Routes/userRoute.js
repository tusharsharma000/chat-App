const express = require("express");
const protectedRoute = require("../middleware/proctectedRoute");
const { getUsers, getUserListOrderedByLastChat, updateUserPreference } = require("../controllers/userController");

const router = express.Router();
// router.get("/", protectedRoute, getUsers);
router.get("/", protectedRoute, getUserListOrderedByLastChat);
router.put("/updatePreference", protectedRoute, updateUserPreference);



// router.post("/signUp", signUp);
// router.post("/logout", logOut);


module.exports = router;