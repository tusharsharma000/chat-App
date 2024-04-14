const jwt = require('jsonwebtoken');

const generateJwtTokens = async(user, res) => {
    let token = jwt.sign({user}, process.env.jwtKey, {
        expiresIn: "15d"
    });
    res.cookie("jwt", token, {
        maxAge: 15 * 24 *60 *60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.Development !== "development"
    })
}

module.exports = generateJwtTokens;