import { Button, useColorMode } from "@chakra-ui/react";

function ThemeButtonComponent() {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleClick = () => {
    // Toggle between light and dark mode
    toggleColorMode();
  };

  return (
    <>
      <Button colorScheme="blue" onClick={handleClick}>
        {colorMode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </Button>
    </>
  );
}

export default ThemeButtonComponent;
