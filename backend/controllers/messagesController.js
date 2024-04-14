const User = require("../models/userModel");
const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");

const sendMessage = async(req, res) => {
    try {
        const {message} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;
        console.log(message);
        console.log(receiverId);
        console.log(senderId);
       let conversation = await Conversation.findOne({
        participants: [senderId, receiverId]
       });
       if (!conversation) {
         conversation =await Conversation.create({
            participants: [senderId, receiverId],
        });
       }
       console.log(conversation);
       let newMessage = await Message.create({
        senderId,
        receiverId,
        message
       });
       console.log(newMessage);

       if (newMessage) {
        conversation.messages.push(newMessage._id);
       }
       await conversation.save();
        await newMessage.save();
      console.log(newMessage);
      return res.status(200).json(newMessage);
        // Message
 
} catch {
    return res.status(500).json({error: "Internal server error"});
}
};

const getMessages = async(req, res) => {
    try {
        console.log("hello");
        const userId = req.params.id;
        const senderId = req.user._id;
        console.log(userId);
        console.log(senderId);
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

        
    } catch {
            return res.status(500).json({error: "Internal server error"});
    }
}
module.exports = {sendMessage, getMessages}