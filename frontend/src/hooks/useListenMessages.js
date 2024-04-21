import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext';
import userConversation from '../zustand/userConversation';

function useListenMessages() {
  const {socket} = useSocketContext();
  const {messages, setMessages} = userConversation();

  useEffect(()=> {
    socket?.on("newMessage",(newMessage)=> {
        setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, messages, setMessages]);
}

export default useListenMessages;