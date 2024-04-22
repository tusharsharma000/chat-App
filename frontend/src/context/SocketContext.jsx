import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './AuthContext';
import io from 'socket.io-client';

export const SocketContext = createContext();
export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({children}) => {
    const [socket,setSocket] = useState(null);
    const [onlineUser, setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();
    useEffect(() => {
        if (authUser) {
            const socket = io("https://chat-app-production-czpv.onrender.com", {
                query: {
                    userId: authUser._id
                }
            });
            setSocket(socket);
            socket.on("getOnlineUsers",(users)=> {
                setOnlineUsers(users);
            });

            return () => setSocket(null);
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);
    const isUserOnline = (userId) => onlineUser.includes(userId);
    return <SocketContext.Provider value={{socket, isUserOnline, onlineUser}}>{children}</SocketContext.Provider>
}
