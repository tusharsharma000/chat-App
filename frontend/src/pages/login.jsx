import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import loginHook from "../hooks/loginHook";

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const {loading, logIn} = loginHook();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(formData);
  };

  return (
    <Flex
      minHeight="100vh"
      align="center"
      justify="center"
      bg={useColorMode.value === "light" ? "gray.100" : "gray.700"}
    >
      <Box p={8} maxWidth="600px" borderWidth={1} borderRadius={8} boxShadow="lg">
      <Heading mb={4}>Login</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormControl>
        <Button mt={4} colorScheme="blue" type="submit">
          Login
        </Button>
        <Flex mt={4} align="center">
          <Box mr={1}>Don't have an account?</Box>
          <Link to="/signup" ml={2} color="blue.500">Sign Up</Link>
        </Flex>
      </form>
    </Box>
    </Flex>
  );
}

export default LoginPage;
