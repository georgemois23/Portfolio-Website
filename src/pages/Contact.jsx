import React from 'react';
import { Flex,Box,Text,Button,Center } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react'
import { EmailIcon } from "@chakra-ui/icons";
import { FaMapMarkerAlt } from 'react-icons/fa';
import Form from '../components/Form';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';    
const Contact = () => {
    const location = useLocation();
    useEffect(() => {
    if (location.pathname === "/contact") {
      document.title =
        "Contact | Moysiadis George | Full-Stack Developer Portfolio";
    } else {
      document.title = "Moysiadis George | Full-Stack Developer Portfolio";
    }
  }, [location]);


    return (
        <Flex justify="center" minH="60vh"  pt={{ base: 4, lg: 10 }} height="fit-content" px={{ sm: 5, lg: 20 }} mb={{base: 20, lg: 20 }}>
           <Box textAlign={"center"}  marginInline={'auto'} >
                <Text fontSize={{ base: 'xl', lg: '4xl' }} fontWeight="bold" mb={4}>
                    Do you want to get in touch with me?
                </Text>
                <Text fontSize={{ base: 'md', lg: 'lg' }} mb={8} color={'gray.500'}>
                Find all my contact information below.
                </Text>

                <Text fontSize={{ base: 'lg', lg: 'xl' }} fontWeight="bold" >
                    Write me!</Text> 
                <Flex 
                direction={'column'} 
                width={'fit-content'} 
                align={'center'} 
                justify={'center'}
                borderRadius="12px" 
                gap={4}
                boxShadow="0 2px 6px rgba(0, 0, 0, 0.4), 0 12px 32px rgba(0, 0, 0, 0.4)"
                // bg="rgba(0, 12, 45, 0.98)" 
                // bg='brand.dark.secondary'
                // backgroundColor= 'rgba(167, 139, 250, 0.6)'
                backgroundColor= 'rgba(2, 90, 78, 0.6)'
                // backdropFilter="blur(14px)"
                // border="1px solid rgba(167, 139, 250, 0.4)"
                border="1px solid rgba(2, 90, 78, 0.4)"
                my={{ sm: 21, lg: 10 }} 
                marginInline={'auto'}
                textAlign={'center'}
                px={2}
                py={4}
               >

                <Flex direction={'column'} width={'fit-content'} alignItems={'center'}  gap={2}  padding={4}  px={{ sm: 21, lg: 20 }} marginInline={'auto'}>
                                  
                 <Form />
                </Flex>
               
                </Flex>
                or
                <Flex 
                direction={'column'} 
                width={'fit-content'} 
                align={'center'} 
                justify={'center'}
                borderRadius="12px" 
                gap={4}
                // boxShadow="0 2px 6px rgba(0, 0, 0, 0.4), 0 12px 32px rgba(0, 0, 0, 0.4)"
                // bg="rgba(0, 12, 45, 0.98)" 
                // bg='brand.dark.secondary'
                // backgroundColor= 'rgba(167, 139, 250, 0.6)'
                // backdropFilter="blur(14px)"
                // border="1px solid rgba(167, 139, 250, 0.4)"
                // my={{ sm: 21, lg: 10 }} 
                marginInline={'auto'}
                textAlign={'center'}
                px={2}
                py={4}
               >


                {/* <Form/> */}

                
                <Flex direction={'column'} width={'fit-content'} alignItems={'center'}  gap={2}  padding={4}  px={{ sm: 21, lg: 20 }} marginInline={'auto'}>
                {/* <Text fontSize={{ base: 'lg', lg: 'xl' }} fontWeight="bold" mb={2}> */}
                    {/* Send me an email</Text>                    */}
                <Button  as="a" 
  href="mailto:contact@moysiadis.dev"  fontSize={{ base: 'sm', lg: '1xl' }} width={'fit-content'} ><Text>Send me an email</Text><EmailIcon ml={2} mt={0.5}/> </Button>
               
                </Flex>
               
                </Flex>
           </Box>
           
        </Flex>
    );
};

export default Contact;