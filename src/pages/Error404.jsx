import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import StarBorder from '../components/react-bits/start-border/StarBorder';

const Error404 = () => {
    document.title = "Page Not Found | Moysiadis George | Full-Stack Developer Portfolio";
    const navigate = useNavigate(); 
    return (
        <Box
            textAlign="center"
            height={"90vh"}
            display={"flex"}
            gap={8}
            flexDirection={"column"}
            minHeight={"90vh"}
            // ={{base: 20, lg: 20 }}
            px={{ base: 10, lg: 20 }}
            pt={{ base: '20vh', lg: '25vh' }}
            
        >
            <Box>
            <Heading
                fontSize={{ sm:'6xl',base: '5xl', lg: '8xl' }}
                // color={'brand.dark.text'}
                color={'brand.dark.secondary'}
            >
                404
            </Heading>
            <Text fontSize={{ sm:'1xl',base: '2xl', lg: '3xl' }} mt={3} mb={2} >
               Page Not Found
            </Text>
            </Box>
            <Text color={'gray.200'} mb={6}>
                The page you are looking for does not exist or has been moved.
            </Text>

            <StarBorder
            as="button"
            color="#916de8"
            thickness={2}
            speed="5s"
            onClick={() => navigate("/")}
            width={'fit-content'}
            _hover={{ cursor: 'pointer' }}
            >
            {/* <Button
                
                width={'fit-content'}
                // colorScheme="teal"
                // bgGradient="linear(to-r, brand.dark.text,  brand.dark.secondary)"
                // color="white"
                variant="solid"
            > */}
                Go to Home Page
            {/* </Button> */}
            </StarBorder>
        </Box>
    );
};

export default Error404;