import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import signUpHook from "../hooks/signUpHook";

function SignUpPage() {
  const { toggleColorMode } = useColorMode();
  const {loading, signUp} = signUpHook();
  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
    confirmPassword: "",
    gender: "",
    username: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(formData);
  };

  return (
    <Flex
      minHeight="100vh"
      align="center"
      justify="center"
      bg={useColorMode.value === "light" ? "gray.100" : "gray.700"}
    >
      <Box p={8} maxWidth="800px" width="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Heading mb={4}>Sign Up</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
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
          <FormControl mt={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Gender</FormLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormControl>
          <Button mt={4} colorScheme="blue" type="submit">
            Sign Up
          </Button>
        </form>
        <Flex mt={4} align="center">
          <Box mr={1}>Already have an account?</Box>
          <Link to="/login" ml={2} color="blue.500" >Sign In</Link>
        </Flex>
      </Box>
    </Flex>
  );
}

export default SignUpPage;
