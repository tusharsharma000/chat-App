const User = require("../models/userModel");
const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");


const getUsers = async(req, res) => {
    try {
    const loggedInUser = req.user._id;
    const userList = await User.find({_id : {$ne: loggedInUser}}).select("-password");
    return res.status(200).json(userList);
} catch {
    return res.status(500).json({error: "Internal server error"});
}

}
module.exports = {getUsers}