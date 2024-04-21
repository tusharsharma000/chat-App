import React, { useEffect, useRef, useState } from "react";
import { Box, Text, VStack, Avatar, Input, Button,  InputGroup, InputRightElement, IconButton, MenuButton, MenuList, MenuItem, Menu } from "@chakra-ui/react";
import userConversation from "../zustand/userConversation";
import  useSendMessage from "../hooks/useSendMessage";
import { FaPaperPlane } from "react-icons/fa";
import { FaEllipsisV } from "react-icons/fa";
import useGetMessage from "../hooks/useGetMessages";
import useListenMessages from "../hooks/useListenMessages";
import moment from 'moment';
import ProfileSelectionDrawer from "./profileSelectionDrawer";
import { FaComment } from "react-icons/fa";


function ChatWindow() {
  const {selectedConversation} = userConversation();
  useListenMessages();
  const currentUser = localStorage.getItem("chat-user") ? JSON.parse(localStorage.getItem("chat-user")) : null;
  const [message, setMessage] = useState("");
  const {sendMessage} = useSendMessage();
  const {messages, loading} = useGetMessage();
  const [open, setOpen] = useState(false);
  const lastMessagesRef = useRef(null);
  const [drawerValue ,setDrawerValue] = useState(null);

  // Dummy data for the user you're chatting with
  const user = {
    name: "John Doe",
    profilePic: "https://via.placeholder.com/150",
  };
  useEffect(()=>{
    setTimeout(()=>{
      lastMessagesRef.current?.scrollIntoView({ behavior : "smooth"});
    }, [100]);
  }, [messages]);
  const handleSendMessage = async() => {
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  }
  const convertToIndiaTime =(utcTime) => {
    const utcMoment = moment.utc(utcTime);
    // Convert the time to India time and format it as "hh:mm A"
    const indiaTime = utcMoment.local().format('hh:mm A');
    return indiaTime;
  };
  const handleDrawerOpen = (preference) => {
    setDrawerValue(preference);
    setOpen(true);
  };
  

  return (
    <>
    {selectedConversation ?
    <VStack spacing={4} align="stretch" height="100%" p={4} flex="1">
      {/* Header displaying profile picture and name */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
      {selectedConversation && <Box  display="flex" alignItems="center">
        <Avatar src={selectedConversation?.profilePicture} size="md" mr={4} />
        <Text fontWeight="bold" color="white">{selectedConversation?.fullName}</Text>
        </Box>}
        <Box alignItems="center">
        <Menu>
  <MenuButton
    transition='all 0.2s'
    borderRadius='md'
  >
    <div
  aria-label="Send"
  onClick={handleSendMessage}
  fontSize="small"
  sx={{
    padding: "8px"
  }}
><FaEllipsisV borderwidth="0px" color="white"/></div>
  </MenuButton>
  <MenuList>
    <MenuItem>Clear Chat</MenuItem>
    <MenuItem onClick={()=>handleDrawerOpen("profile")}>Edit Profile Picture</MenuItem>
    <MenuItem onClick={()=>handleDrawerOpen("background")}>Edit Background Image</MenuItem>
  </MenuList>
</Menu>
        </Box>
      </Box>
      {/* Chat messages */}
      <Box p={4} display="flex" flexDirection="column" alignItems="flex-start" borderRadius="md" flex="1" overflowY="auto">
      {messages?.length == 0 && <Box height="100%" color="white" alignSelf="center">
      Start new conversation
      </Box>}
      {messages?.map((data, ind)=>{
        return (<>
        {data?.receiverId == currentUser._id ? 
          <Box key={ind} display="flex" bgColor="rgba(255, 255, 255, 0.9)" borderRadius="50px" boxShadow="0px 15px 5px 0px rgba(0,0,0,0.5)" position="relative" mb="30px" padding="15px 20px 28px 70px">
          <Box display="flex">
          <img className="image-round" src={selectedConversation?.profilePicture}/>
          <Text className="time-away" fontSize={10} alignSelf="end">{convertToIndiaTime(data.createdAt)}</Text>
          </Box>
          <Text  borderRadius="md">{data?.message}</Text>
        </Box> :
        
        <Box display="flex" maxWidth="50%" bgColor="rgba(255, 255, 255, 0.9)"  borderRadius="50px" alignSelf="flex-end"  boxShadow="0px 15px 5px 0px rgba(0,0,0,0.5)" position="relative" padding="15px 70px 15px 20px" mb={4}>
        <img className="image-round-right" src={currentUser.profilePicture}/>
        <Box display="flex" flexDirection="column" width="100%">
          <Text  borderRadius="md">{data?.message}</Text>
          <Text fontSize={10} alignSelf="end">{convertToIndiaTime(data.createdAt)}</Text>
        </Box>
        </Box>
        }
        <div style={{ height: "0px", width: "0px"}} ref={lastMessagesRef}></div>
        </>);
      })}
      </Box>

      {/* Message writing field and send button */}
      <Box p={2} borderRadius="md">
      <InputGroup>
        <Input
          type="text"
          value={message}
          placeholder="Type your message..."
          bg="white"
          onChange={(e) => setMessage(e.target.value)}
        />
        <InputRightElement>
          <IconButton
            aria-label="Send"
            icon={<FaPaperPlane />}
            onClick={
              handleSendMessage
              // Handle send message action here
            }
          />
        </InputRightElement>
      </InputGroup>
    </Box>
    </VStack> : <VStack spacing={4} align="center" justify="center" height="100%" p={4} flex="1">
  <Text color="white" fontSize="2xl">
    Welcome 👋 {currentUser.fullName}
  </Text>
  <Text color="white" fontSize="2xl" align="center">
    Select a chat to start a conversation
    <Box align="center" justify="center"><FaComment size={50} style={{ marginLeft: '5px', verticalAlign: 'middle', marginTop: '5px' }} /></Box>
  </Text>
</VStack>}
    <ProfileSelectionDrawer open={open} setOpen={setOpen} drawerValue={drawerValue}/>
    </>
  );
}

export default ChatWindow;
