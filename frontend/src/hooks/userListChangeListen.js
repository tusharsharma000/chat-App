import { useEffect } from "react"
import { useSocketContext } from "../context/SocketContext";

const userListChangeListen = ({ setConversations }) => {
    const {socket} = useSocketContext();
    useEffect(()=> {
        socket?.on("userList",(newMessage)=> {
            console.log(newMessage, "88")
            setConversations(newMessage.userList);
        });

        return () => socket?.off("userList");
    }, [socket]);
}
export default userListChangeListen;