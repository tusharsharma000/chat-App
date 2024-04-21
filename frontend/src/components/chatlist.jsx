import React, { useEffect, useState } from "react";
import { Box, Flex, Input, Avatar, Text, VStack, InputGroup, InputLeftElement, InputRightElement, IconButton, useToast, Divider } from "@chakra-ui/react";
import userConversation from "../zustand/userConversation";
import { useSocketContext } from "../context/SocketContext";
import ChatUserSingle from "./ChatUsers";
import userGetConversation from "../hooks/userGetConversation";
import { IoSearch } from "react-icons/io5";

function ChatList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const {loading, conversations, setConversations} = userGetConversation();
  const {selectedConversation, setSelectedConversation} = userConversation();
  const {onlineUser} = useSocketContext();
  const toast = useToast();


useEffect(() => {
    return ()=>setSelectedConversation(null);
  }, [setSelectedConversation]);
  const dummyResults = [
    { id: 1, name: "John Doe", imageUrl: "https://via.placeholder.com/150" },
    { id: 2, name: "Jane Smith", imageUrl: "https://via.placeholder.com/150" },
    { id: 3, name: "Alice Johnson", imageUrl: "https://via.placeholder.com/150" },
  ];

  // Function to handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if(!searchTerm) return;
    // Simulate search functionality
    if (searchTerm.trim().length < 3 ) {
      toast({
        title: "Search at least 3 characters",
        status: 'error',
        duration: 2000,
      });
      return;
    }
      const filteredResults = conversations.find((result) =>
        result.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredResults) {
        setSelectedConversation(filteredResults);
        setSearchTerm("");
      }
  };

  return (
    <Box>
    <Flex direction="column" align="center">
      <form onSubmit={handleSearch} style={{ width: '98%' }}>
        <InputGroup>
          <Input
            type="text"
            placeholder="Search friends..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputRightElement width="2.6rem">
            <IconButton
              type="submit"
              aria-label="Search"
              colorScheme="blue"
              icon={<IoSearch />}
            />
          </InputRightElement>
        </InputGroup>
      </form>

      <Divider
  mt={5}
  mb={4}
  width="80%"
  borderBottomWidth="0.5px"
  opacity="0.4"
/>

    </Flex>
    <Box overflowY="auto" maxHeight="calc(100vh - 300px)">
  <VStack align="stretch" spacing={5} mt={2}>
    {conversations?.map((result, ind) => (
      <ChatUserSingle userData={result} key={ind} />
    ))}
  </VStack>
</Box>
  </Box>
  

  );
}

export default ChatList;
