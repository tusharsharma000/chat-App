const User = require("../models/userModel");
const UserList = require("../models/userListModel");
const bcrypt = require('bcrypt');
const generateJwtTokens = require("../utils/generateJwtTokens");

const login = async(req, res) => {
    try {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
    if (!user || !isPasswordCorrect) {
        res.status(404).json({error: "username or password is invalid"});
    }
    generateJwtTokens(user._id, res);
    let userList = await UserList.findOne({ currentUser: user.id });
    if (!userList) {
        userList = await UserList.create({
            currentUser: user,
            userList: []
        });
        await userList.save();
    }
    return res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        gender: user.gender,
        profilePicture: user.profilePicture
    });
} catch {
    return res.status(500).json({error: "Internal server error"});
}
};
const logOut = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge: 0})
    return res.status(200).json({message: "User logged Out"});
    } catch {
    return res.status(500).json({error: "Internal server error"});
    }
};
const signUp = async(req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({error: "password didn't match"});
        }
        const user = await User.findOne({username});
        if (user) {
            return res.status(400).json({error: "username already exists"});
        }
        
        const fetchBoyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const fetchGirlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        //HashPassword here
        const salt = await bcrypt.genSalt(10);
        const PasswordGenerated = await bcrypt.hash(password, salt);
        const newUser = User({
            fullName,
            username,
            password: PasswordGenerated,
            gender,
            profilePicture: gender === "male" ? fetchBoyPic : fetchGirlPic
        });
        if (newUser) {
            generateJwtTokens(newUser._id, res);
           await newUser.save();
        return res.status(200).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            gender: newUser.gender,
            profilePicture: newUser.profilePicture
        });
        }
    } catch {
        return res.status(500).json({error: "Internal server error"});
    }
};

module.exports = {login, logOut, signUp};