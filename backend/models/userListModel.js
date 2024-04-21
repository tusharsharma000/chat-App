const mongo = require("mongoose");

const userListSchema = new mongo.Schema({
    currentUser: {
        type: mongo.Schema.Types.ObjectId,
        ref: "User",
    },
    userList: [{
        type: mongo.Schema.Types.ObjectId,
        ref: "User",
        default: []
    }]
});
const UserListSchema = mongo.model("userList", userListSchema);
module.exports = UserListSchema;