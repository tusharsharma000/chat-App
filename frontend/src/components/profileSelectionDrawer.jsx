import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, SkeletonCircle, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import userConversation from '../zustand/userConversation';
import { useAuthContext } from '../context/AuthContext';

const ProfileSelectionDrawer =({open, setOpen, drawerValue}) =>{
    const [profileImages, setProfileImages] = useState(null);
    const [loader, setLoader]= useState(false);
    const [makeActiveProfile, setMakeActiveProfile] = useState(null);
    const { setAuthUser } = useAuthContext();
    const toast = useToast();
    const handleClose = () => {
        setOpen(false);
        setMakeActiveProfile(null);
    };
    useEffect(() => {
        let isMounted = true;
      
        if (open) {
          const getAvatars = async () => {
            setLoader(true);
            try {
              const res = await fetch("https://avatar.iran.liara.run/api");
              const data = await res.json();
              if (isMounted) {
                setProfileImages(data.all);
                if (data.error) throw new Error();
                setLoader(false);
              }
            } catch (error) {
              console.log(error?.message);
              if (isMounted) {
                setLoader(false);
              }
            }
          };
      
          getAvatars();
        }
      
        // Cleanup function
        return () => {
          isMounted = false;
        };
      }, [open]);
      const handleSavePreference =async () => {
        if(!makeActiveProfile) {
          toast({
            title: "Choose profile picture",
            status: "error",
            duration: 2000,
        });
        return;
        } 
        try {
          const res =  await fetch("/api/users/updatePreference", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({profilePicture: `https://avatar.iran.liara.run${makeActiveProfile}` })
        });
        const data = await res.json();
        if(data.error) {
          throw new Error(data.error);
        }
        setAuthUser(data);
        localStorage.setItem("chat-user", JSON.stringify(data));
        toast({
          title: "Profile picture updated",
          status: "success",
          duration: 2000,
      });
        handleClose();
        } catch(error) {
          console.log(error);
        }
      };
      
    const Backgrounds = {
        title: "Edit Background Image",
        description: "Choose Backgrounds Images"
    };
    const Profiles = {
        title: "Edit Profile Image",
        description: "Choose Profile Images"
    };
    const userSelection = (drawerValue == "background") ? Backgrounds: Profiles;
  return (
    <>
    <Drawer onClose={handleClose} isOpen={open} size="xl">
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>{userSelection?.title}</DrawerHeader>
      <DrawerBody>
      <Text>{userSelection?.description}</Text>
      <Box display="flex" flexWrap="wrap">
      {loader &&  [1, 2, 3, 4, 5,6,7,8,9,10].map((image, index) => (
          <Box key={index} flex="0 0 20%" margin="1%">
          <SkeletonCircle size='25' />
          <SkeletonCircle size='25' mt={10}/>
          <SkeletonCircle size='25' mt={10}/>
          </Box>
        ))}
        <Box
  display="flex"
  flexWrap="wrap"
  justifyContent="center"
  maxHeight="70vh"
  overflowY="auto"
  mt={2}
  mb={2}
>
  {!loader &&
    profileImages?.map((item, index) => (
      <Box
        key={index}
        flex="0 0 20%"
        margin="1%"
        height="100px" // Adjust the height as needed
        onClick={() => setMakeActiveProfile(item)}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            border: `${
              makeActiveProfile === item ? "10px solid #00ff00" : "1px solid #ccc"
            }`,
            borderRadius: "50px",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          <img
            src={`https://avatar.iran.liara.run${item}`}
            alt={item}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </Box>
    ))}
</Box>

</Box>
 <Box display="flex" justifyContent="end" mt={4} >
      {/* <Button type='button' form='my-form' mr={6}>
              Cancel
            </Button> */}
            <Button colorScheme='blue' type='button' form='my-form' onClick={handleSavePreference}>
              Save
            </Button> 
      </Box>
      </DrawerBody>

    </DrawerContent>
  </Drawer>
  </>
  )
}

export default ProfileSelectionDrawer;