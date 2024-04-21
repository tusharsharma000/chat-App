import { create } from 'zustand';

const userConversation = create((set) => ({
    selectedConversation: localStorage.getItem("selectedConversation") ? JSON.parse(localStorage.getItem("selectedConversation")) :null,
    setSelectedConversation: (newConversation) => set({ selectedConversation: newConversation }),
    messages: [],
    setMessages: (newMessages) => set({ messages: newMessages }),
}));

export default userConversation;
