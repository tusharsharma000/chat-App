import React, { useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";
import ChatList from "./chatlist";
import ChatWindow from "./ChatWindow";
import userGetConversation from "../hooks/userGetConversation";
import userConversation from "../zustand/userConversation";
import userListChangeListen from "../hooks/userListChangeListen";

function ChatUi() {
  const {loading, conversations, setConversations} = userGetConversation();
  const {selectedConversation, setSelectedConversation} = userConversation();
  userListChangeListen({setConversations});
  useEffect(() => {
    if (localStorage.getItem("selectedConversation")) {
      setSelectedConversation(JSON.parse(localStorage.getItem("selectedConversation")));
    }

    return () => setSelectedConversation(null);
  }, []);
  return (
    <Flex  h="100vh"
    p={20}
    bg="url('https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg')"
    bgSize="cover"
    bgPos="center center"
    flexDirection="row"
    fontFamily="Lato, sans-serif"
    margin="0 0 0px">
      {/* Sidebar for the list of contacts */}
      <Box w="400px" bg="rgba(255, 255, 255, 0.1)" // Background color with opacity
        boxShadow="0px 0px 10px 5px rgba(0,0,0,0.7)" // Shadow for depth
        backdropFilter="blur(3px)"
>
        <ChatList/>
      </Box>

      {/* Main content area for the chat window */}
      <Box flex="1" bg="rgba(255, 255, 255, 0.1)" // Background color with opacity
        boxShadow="0px 0px 10px 5px rgba(0,0,0,0.7)" // Shadow for depth
        backdropFilter="blur(2px)">
        <ChatWindow/>
      </Box>
    </Flex>
  );
}

export default ChatUi;
