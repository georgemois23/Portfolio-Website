import React from 'react';
import {
  Box,
  Text,
  Button,
  Center,
  Heading,
  Flex,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUserPlus } from 'react-icons/fi';
import { RiMailSendLine } from "react-icons/ri";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';    
import SpotlightCard from '../components/react-bits/spotlight/SpotlightCard';
    
const ReadMe = () => { 
  const location = useLocation();
    useEffect(() => {
    if (location.pathname === "/contact") {
      document.title =
        "ReadMe | Moysiadis George | Full-Stack Developer Portfolio";
    } else {
      document.title = "Moysiadis George | Full-Stack Developer Portfolio";
    }
  }, [location]);
  const navigate = useNavigate();

  const bg = 'transparent';
//   const cardBg = 'brand.dark.text';
  // const cardBg = "rgba(0, 10, 38, 0.4)";
  // const cardBg = 'rgba(167, 139, 250, 0.2)';
  // const cardBg = 'rgba(2, 90, 78, 0.2)';
  const cardBg = 'rgba(145, 109, 232, 0.2)';
  const headingColor = 'brand.dark.secondary';
  const textColor = 'brand.dark.text';

  const sections = [
  {
    title: 'Who am I',
    content:
      "I'm a 4th-year Applied Informatics (Computer Science) student at the University of Macedonia. I have hands-on experience as a full-stack developer, building scalable applications using React, Next.js, and TypeScript. I have strong knowledge of HTML, CSS, JavaScript, SQL, APIs, and backend development with NestJS and PostgreSQL. I am passionate about clean architecture, maintainable code, and delivering practical solutions from concept to deployment.",
  },
  {
    title: 'How I work',
    content:
      "I enjoy collaborating with others, sharing ideas, and tackling challenging problems. I follow best practices, write clean and maintainable code, and continuously improve my skills. My workflow includes working with modern tools and frameworks, such as React, Next.js, TypeScript, GraphQL, Docker, and Redis. I value teamwork, open communication, and knowledge sharing in every project I work on.",
  },
  {
    title: 'Who can connect',
    content:
      "Anyone interested in technology, programming, or creative collaboration is welcome to connect. Whether you're experienced or just starting out, I enjoy sharing knowledge, contributing to open-source projects, and helping others grow as developers. I also welcome connections for internships, collaborations, or professional guidance in full-stack development.",
  },
];


  return (
    <Box minH="70vh" px={{ base: 4, md: 10 }} py={0} bg={bg}>
      <Heading
        as="h1"
        fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
        mb={12}
        color={textColor}
        textAlign="center"
        userSelect={'none'}
      >
        ReadMe  
      </Heading>

      <Flex
        direction={{ base: 'column', lg: 'row' }}
        gap={12}
        justify="center"
        align="stretch"
        flexWrap="wrap"
        maxW="7xl"
        mx="auto"
        userSelect={'none'}
      >
        {sections.map((section, index) => (
          <SpotlightCard spotlightColor="rgba(145, 109, 232, 0.5)"
            key={index}
            bg={cardBg}
            p={6}
            rounded="xl"
            shadow="lg"
            flexBasis={{ base: '100%', md: '45%', lg: '30%' }}
            transition="all 0.2s"
            sx={{
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)', 
            }}
            // _hover={{ shadow: 'xl' }}
            // boxShadow="0 2px 6px rgba(0, 0, 0, 0.4), 0 12px 32px rgba(0, 0, 0, 0.4)"
            // border="1px solid rgba(255, 255, 255, 0.13)"
          >
            <Heading
              as="h3"
              size="md"
              mb={4}
              textAlign="left"
              color={headingColor}
            >
              {section.title}
            </Heading>
            <Text textAlign="left" color={textColor} as={'p'}>
              {section.content}
            </Text>
          </SpotlightCard>
        ))}
      </Flex>
    </Box>
  );
};

export default ReadMe;
