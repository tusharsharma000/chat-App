import React, { useEffect, useState } from "react";
import { Box, Flex, Input, Avatar, Text, VStack } from "@chakra-ui/react";
import userConversation from "../zustand/userConversation";
import { useSocketContext } from "../context/SocketContext";
import ChatUsers from "./ChatUsers";

function ChatUserSingle({userData}) {
  const {selectedConversation, setSelectedConversation} = userConversation();
  const {isUserOnline, onlineUser} = useSocketContext();

  const handleConversationSelection = () => {
    setSelectedConversation(userData);
    localStorage.setItem("selectedConversation", JSON.stringify(userData));
  }
  return (
    <>
    <Flex key={userData._id} align="center" onClick={handleConversationSelection} bgColor={`${(selectedConversation?._id === userData._id) && "rgba(245, 181, 108, 0.4)"}`}>
    <div style={{ position: 'relative', paddingLeft:"5px", paddingRight:"5px", paddingTop:"2px", paddingBottom:"2px"}}>
        <Avatar src={userData.profilePicture} size="md" mr={4} />
        {isUserOnline(userData._id) ? <div style={{ position: 'absolute', top: 38, right: "20px", backgroundColor: '#1bcc1b', width: '10px', height: '10px', borderRadius: '50%' }} />: <div style={{ position: 'absolute', top: 38, right: "20px", backgroundColor: '#b4acac', width: '10px', height: '10px', borderRadius: '50%' }} />}
    </div>
    <Text color="white">{userData.fullName}</Text>
  </Flex>
  </>
  )
}

export default ChatUserSingle;