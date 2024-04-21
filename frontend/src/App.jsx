import { useState } from 'react'
import './App.css'
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import ThemeButtonComponent from './themeButtonComponent'
import Navbar from './components/navbar';
import SignUpPage from './pages/signUp';
import LoginPage from './pages/login';
// import Sidebar from './components/sidebar';
import ChatUi from './components/chat';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContextProvider, useAuthContext } from './context/AuthContext';


function App() {
  const {authUser} = useAuthContext();

  return (
    <>
     <ChakraProvider>
     <Routes>
      <Route path='/' element={authUser ?<ChatUi/>: <Navigate to="/login"/>}/>
      <Route path='/login' element={authUser ? <Navigate to="/"/>:<LoginPage/>}/>

      <Route path='/signup' element={authUser ? <Navigate to="/"/>:<SignUpPage/>}/>

     </Routes>
    </ChakraProvider>
    </>
  )
}

export default App
