import React, { useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import Form from '../components/Form';
import { useLocation } from 'react-router-dom';

const Contact = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/contact") {
      document.title = "Contact | Moysiadis George | Full-Stack Developer Portfolio";
    } else {
      document.title = "Moysiadis George | Full-Stack Developer Portfolio";
    }
  }, [location]);

  return (
    <Flex 
      justify="center" 
      minH="60vh" 
      pt={{ base: 2, lg: 8 }} 
      height="fit-content" 
      px={{ base: 3, sm: 6, lg: 20 }} 
      mb={{ base: 20, lg: 20 }}
      userSelect={'none'}
    >
      <Box textAlign="center" marginInline="auto" w="100%" maxW="4xl">
        <Text fontSize={{ base: 'xl', md: '2xl', lg: '4xl' }} fontWeight="bold" mb={3} color="brand.dark.text">
          Do you want to get in touch with me?
        </Text>

        <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} color="brand.dark.text" opacity={0.85} mb={6}>
          Write me!
        </Text>
        
        <Flex
          position="relative"
          overflow="hidden"
          direction="column"
          width="100%"
          maxW="640px"
          align="center"
          justify="center"
          borderRadius="12px"
          gap={4}
          background="linear-gradient(120deg, rgba(20, 16, 40, 0.95) 0%, rgba(33, 23, 60, 0.92) 48%, rgba(16, 24, 46, 0.95) 100%)"
          border="1px solid rgba(145, 109, 232, 0.45)"
          boxShadow="0 16px 42px rgba(38, 24, 78, 0.4)"
          my={{ base: 6, md: 10 }}
          marginInline="auto"
          textAlign="center"
          px={{ base: 3, md: 5 }}
          py={{ base: 4, md: 6 }}
        >
          <Box
            position="absolute"
            top="-70px"
            left="-80px"
            w="170px"
            h="170px"
            borderRadius="full"
            bg="radial-gradient(circle, rgba(145,109,232,0.2) 0%, rgba(145,109,232,0) 72%)"
            pointerEvents="none"
          />
          <Box
            position="absolute"
            right="-70px"
            bottom="-80px"
            w="170px"
            h="170px"
            borderRadius="full"
            bg="radial-gradient(circle, rgba(95,170,255,0.16) 0%, rgba(95,170,255,0) 72%)"
            pointerEvents="none"
          />
          <Flex
            position="relative"
            zIndex={1}
            direction="column"
            width="100%"
            alignItems="center"
            gap={2}
            padding={{ base: 1, md: 2 }}
            marginInline="auto"
          >
            <Form />
          </Flex>
        </Flex>
      </Box>

    </Flex>
  );
};

export default Contact;