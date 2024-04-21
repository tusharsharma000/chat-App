const UserListSchema = require("../models/userListModel");
const { getReceiverSocketId,io} = require("../socket/socket");


const userListModification = async(senderId, receiverId) => {
    const updatedUserList = await UserListSchema.findOne({ currentUser: senderId });
    if (updatedUserList) {
        const index = updatedUserList.userList.findIndex(user => user._id.toString() === receiverId);
        if (index !== -1) {
            // Remove the user from the array and store it
            const userToBringToFront = updatedUserList.userList.splice(index, 1)[0];
            // Unshift the user to the beginning of the array
            updatedUserList.userList.unshift(userToBringToFront._id); // Save only the ID
            // Save the updated UserList document
            await updatedUserList.save();
        }
    }
    try {
        await updatedUserList.populate([{ path: 'userList', select: '-password' }]);
        const senderSocketId =  getReceiverSocketId(senderId);
        if (senderSocketId) {
            console.log(senderSocketId, "id");
            io.to(senderSocketId).emit("userList", updatedUserList);
            console.log(updatedUserList);
        }
    } catch (error) {
        console.error('Error populating userList:', error);
    }
    console.log(updatedUserList,"19");
    const userReceivingList = await UserListSchema.findOne({ currentUser: receiverId });
    if (userReceivingList) {
        const index = userReceivingList.userList.findIndex(user => user._id.toString() === senderId);
        if (index !== -1) {
            // Remove the user from the array and store it
            const userToBringToFront = userReceivingList.userList.splice(index, 1)[0];
            // Unshift the user to the beginning of the array
            userReceivingList.userList.unshift(userToBringToFront._id); // Save only the ID
            // Save the updated UserList document
            await userReceivingList.save();
        }
    }
    try {
        await userReceivingList.populate([{ path: 'userList', select: '-password' }]);
        const receiverSocketId =  getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("userList", updatedUserList);
            console.log(updatedUserList);
        }
    } catch (error) {
        console.error('Error populating userList:', error);
    }
    console.log(updatedUserList,"19");
}
module.exports = {userListModification};