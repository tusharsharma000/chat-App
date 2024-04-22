const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const protectedRoute = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log(token);
        if (!token) {
            return res.status(401).json({error: "unauthorized access- token not found."});
        }
        const decoded = jwt.verify(token, process.env.jwtKey);
        if (!decoded) {
            return res.status(401).json({error: "unauthorized Invalid token."});

        }
        const user = await User.findById(decoded.user).select("-password");
        if (!user) {
            return res.status(401).json({error: "User not found."});
        }
        req.user = user;
        next();

    }  catch {

    }
}
module.exports = protectedRoute;