const UserList = require("../models/userListModel");
const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");
const { getReceiverSocketId, io } = require("../socket/socket");
const { userListModification } = require("../functions/userListModification");

const sendMessage = async(req, res) => {
    try {
        const {message} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });
       if (!conversation) {
         conversation =await Conversation.create({
            participants: [senderId, receiverId],
        });
       }
       let newMessage = await Message.create({
        senderId,
        receiverId,
        message
       });

       if (newMessage) {
        conversation.messages.push(newMessage._id);
       }
       await conversation.save();
        await newMessage.save();
        await userListModification(senderId, receiverId);
        const receiverSocketId =  getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
      return res.status(200).json(newMessage);
        // Message
 
} catch {
    return res.status(500).json({error: "Internal server error"});
}
};

const getMessages = async(req, res) => {
    try {
        const userId = req.params.id;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userId]}
        }).populate("messages");
        if (!conversation) {
            return res.status(200).json([]);
        }
    
        // Map messages and add the `sendBy` field
        let data = conversation.messages.map((message, ind) => {
            const sendBy = message.senderId.equals(senderId) ? "you" : "other";
            return { ...message._doc, sendBy }; // Access the senderId property correctly
        });
        return res.status(200).json(data);

        
    } catch {
            return res.status(500).json({error: "Internal server error"});
    }
}
module.exports = {sendMessage, getMessages}