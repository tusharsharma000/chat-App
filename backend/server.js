const express = require("express");
const dotEnv = require("dotenv");
const router = require("./Routes/apiRoute");
const messageRoute = require("./Routes/messageRoute");
const userRoute = require("./Routes/userRoute");
const connectToMongo = require("./db/mongoConnection");
const parser = require("cookie-parser");
const { app,server, io } = require("./socket/socket");
const path = require("path");


dotEnv.config();
const Port = process.env.Port || 5000;
const __dirnames = path.resolve();

app.use(express.json());
app.use(parser());

// app.get("/",(req, res)=>{
//     res.send("heelosssas");
// })
app.use("/api/auth", router);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);
app.use(express.static(path.join(__dirnames, "/frontend/dist")));
app.get("*",(req,res)=>{
res.sendFile(path.join(__dirnames, "frontend", "dist", "index.html"));
});


server.listen(Port, ()=> { 
    connectToMongo();
    console.log("server is running")});