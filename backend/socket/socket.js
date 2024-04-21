const { Server } = require('socket.io');
const http = require("http");
const express = require("express");
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT"]
    }
});
const getReceiverSocketId = (receiverId) => {
  return userConnectedMap[receiverId];
}
const userConnectedMap = {};
io.on('connection', (socket) => {
    console.log('A socket user connected', socket.id);
    const userId = socket.handshake.query.userId;
    if (userId != undefined) {
      userConnectedMap[userId] = socket.id;
    }
    io.emit("getOnlineUsers", Object.keys(userConnectedMap));
    // Handle socket events here
   //it can be used in both client and server side 
    socket.on('disconnect', () => {
      console.log('User socket disconnected', socket.id);
      delete userConnectedMap[userId];
    io.emit("getOnlineUsers", Object.keys(userConnectedMap));

    });
  });

  module.exports =  {io, app, server, getReceiverSocketId}