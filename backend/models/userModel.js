const mongo = require("mongoose");

const userSchema = new mongo.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilePicture: {
        type: String,
        default: ""
    },
});
const User = mongo.model("User", userSchema);
module.exports = User;