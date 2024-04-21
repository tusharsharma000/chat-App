import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useAuthContext } from '../context/AuthContext';

const loginHook = () => {
    const [loading, setIsLoading] = useState(false);
    const toast = useToast();
    const { setAuthUser } = useAuthContext();
    const logIn = async ({ username, password }) => {
        const success = handleError({ username, password });
        if (!success) return;
        setIsLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            console.log(data);
            if (!res.ok) {
                if (res.status === 404) {
                    // Handle 404 Not Found
                    toast({
                        title: data.error,
                        status: "error",
                        duration: 2000,
                    });
                    return
                }
            }
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            toast({
                title: "Something went wrong",
                status: "error",
                duration: 2000,
            });
        }
        setIsLoading(false);

    };
    const handleError = ({ username, password }) => {
        if (!username || !password) {
            toast({
                title: 'Please fill all fields.',
                status: 'error',
                duration: 2000,
            });
            return false;
        }
        return true;
    }
    return { logIn, loading }
}

export default loginHook;
