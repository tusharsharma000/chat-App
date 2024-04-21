import { useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

function userGetConversation() {
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [conversations, setConversations] = useState([]);
    useEffect(()=>{
        const getConversation = async() =>  {
            setLoading(false);
            try{
                const res = await fetch("/api/users");
                const data = await res.json();

                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data.userList);

            } catch(error) {
                toast({
                    title: error.message,
                    status: 'error',
                    duration: 2000,
                  });
            }
            setLoading(false);
        };
        getConversation();
    }, []);
    return {loading, conversations, setConversations};
}

export default userGetConversation;