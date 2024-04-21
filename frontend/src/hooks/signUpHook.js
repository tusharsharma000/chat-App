import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useAuthContext } from '../context/AuthContext';

const signUpHook =() => {
  const [loading, setIsLoading] = useState(false);
  const toast = useToast();
  const {authUser, setAuthUser}  = useAuthContext();
  const signUp = async({fullName, gender, username, password, confirmPassword}) => {
    const success = handleError({fullName, gender, username, password, confirmPassword});
    if (!success) return;
    setIsLoading(true);
    try {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({fullName, gender, username, password, confirmPassword})
        });
        const data = await res.json();
        console.log(data);
        localStorage.setItem("chat-user", JSON.stringify(data));
        setAuthUser(data);
    }catch {
        console.log("error");
    }
    setIsLoading(false);

  };
  const handleError = ({fullName, gender, username, password, confirmPassword}) => {
    if (!fullName || !gender || !username  || !password || !confirmPassword) {
        toast({
            title: 'Please fill all fields.',
            status: 'error',
            duration: 2000,
          });
        return false;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Password doesn't match",
        status: 'error',
        duration: 2000,
      });
    return false;
    }
    return true;
}
  return {signUp , loading}
}

export default signUpHook;
