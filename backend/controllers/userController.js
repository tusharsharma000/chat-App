const User = require("../models/userModel");
const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");
const UserListSchema = require("../models/userListModel");


const getUsers = async(req, res) => {
    try {
    const loggedInUser = req.user._id;
    const userList = await User.find({_id : {$ne: loggedInUser}}).select("-password");
    return res.status(200).json(userList);
} catch {
    return res.status(500).json({error: "Internal server error"});
}
}
const getUserListOrderedByLastChat = async(req, res) => {
    try {
        const loggedInUser = req.user._id;
        let userData = await UserListSchema.findOne({ currentUser: req.user._id }).populate('userList');
    if (userData.userList.length === 0) {
        // Find all users except the currently logged-in user
        const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");
        
        // Update userData.userList with the found users
        userData.userList = users;
    
        // Save the updated userData to the database
        await userData.save();
    }
        // const userList = await User.find({_id : {$ne: loggedInUser}}).select("-password");

        return res.status(200).json(userData);
    } catch {
        return res.status(500).json({error: "Internal server error"});
    }   
}
const updateUserPreference = async(req, res) => {
    try {
        const {profilePicture} = req.body;
        console.log(profilePicture);
        const userId = req.user._id;
        let userToUpdate = await User.findById({
            _id: userId
        })
        console.log(userToUpdate, "user");
        if (!userToUpdate) return res.status(404).json({error: "User not found"});
        userToUpdate.profilePicture = profilePicture;
        await userToUpdate.save();
        console.log(userToUpdate, "user2");
        return res.status(200).json({
            _id: userToUpdate._id,
            fullName: userToUpdate.fullName,
            username: userToUpdate.username,
            gender: userToUpdate.gender,
            profilePicture: userToUpdate.profilePicture
        });
    } catch {
        return res.status(500).json({error: "Internal server error"});
    }
}
module.exports = {getUsers, getUserListOrderedByLastChat, updateUserPreference}