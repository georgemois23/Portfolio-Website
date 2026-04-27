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
          direction="column"
          width="100%"
          maxW="640px"
          align="center"
          justify="center"
          borderRadius="12px"
          gap={4}
          backgroundColor="rgba(42, 28, 74, 0.92)"
          border="1px solid rgba(145, 109, 232, 0.45)"
          my={{ base: 6, md: 10 }}
          marginInline="auto"
          textAlign="center"
          px={{ base: 3, md: 5 }}
          py={{ base: 4, md: 6 }}
        >
          <Flex
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