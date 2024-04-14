const mongo = require("mongoose");

const messageSchema = new mongo.Schema({
    senderId: {
        type: mongo.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongo.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {timestamps: true});
const Message = mongo.model("Message", messageSchema);
module.exports = Message;