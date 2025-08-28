import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";

const Error404 = () => {
    const navigate = useNavigate(); 
    return (
        <Box
            textAlign="center"
            height={"fit-content"}
            minHeight={"90vh"}
            // ={{base: 20, lg: 20 }}
            px={{ base: 10, lg: 20 }}
            pt={{ base: 30, lg: 30 }}
            
        >
            <Heading
                fontSize={{ sm:'6xl',base: '5xl', lg: '8xl' }}
                color={'brand.dark.text'}
            >
                404
            </Heading>
            <Text fontSize={{ sm:'1xl',base: '2xl', lg: '3xl' }} mt={3} mb={2}>
               Page Not Found
            </Text>
            <Text color={'gray.500'} mb={6}>
                The page you are looking for does not exist or has been moved.
            </Text>

            <Button
                onClick={() => navigate("/")}
                // colorScheme="teal"
                // bgGradient="linear(to-r, brand.dark.text,  brand.dark.secondary)"
                // color="white"
                variant="solid"
            >
                Go to Home Page
            </Button>
        </Box>
    );
};

export default Error404;