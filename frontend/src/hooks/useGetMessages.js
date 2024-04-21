import React, { useEffect, useState } from 'react'
import userConversation from '../zustand/userConversation';

function useGetMessage() {
    const [loading, setLoading] = useState(false);
  const {selectedConversation, messages, setMessages} = userConversation();
  useEffect(()=> {
    const getMessage = async() => {
        setLoading(true);
        try {
            const res = await fetch(`/api/messages/${selectedConversation._id}`);
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setMessages(data);
        } catch(error) {
            console.log(error.message);
        }
        setLoading(false);
     }
     if(selectedConversation?._id) getMessage();
  }, [selectedConversation?._id]);
  return {messages, loading}
}

export default useGetMessage;