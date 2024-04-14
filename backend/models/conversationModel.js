const mongo = require("mongoose");

const conversationSchema = new mongo.Schema({
    participants: [{
        type: mongo.Schema.Types.ObjectId,
        ref: "User",
    }],
    messages: [{
        type: mongo.Schema.Types.ObjectId,
        ref: "Message",
        default: []
    }],
}, {timestamps: true});
const Conversation = mongo.model("Conversation", conversationSchema);
module.exports = Conversation;