import React, { useState } from 'react'
import userConversation from '../zustand/userConversation';

function useSendMessage() {
    const [loading, setLoading] = useState(false);
  const {selectedConversation, messages, setMessages} = userConversation();
 const sendMessage = async(message) => {
    setLoading(true);
    console.log(message);
    try {
        const res = await fetch(`/api/messages/send/${selectedConversation._id}`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({message})
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages([...messages, data]);
    } catch(error) {
        console.log(error.message);
    }
 }
 return  {sendMessage, loading};
}

export default useSendMessage;