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

const ReadMe = () => {
  document.title = 'Readme | Moysiadis George Full Stack Developer';
  const navigate = useNavigate();

  const bg = 'transparent';
//   const cardBg = 'brand.dark.text';
  const cardBg = "rgba(0, 10, 38, 0.95)";
  const headingColor = 'brand.dark.secondary';
  const textColor = 'brand.dark.text';

  const sections = [
    {
      title: 'Who am I',
      content:
        "I'm a full stack developer specializing in React and TypeScript for backend development. I have strong knowledge of HTML, CSS, JavaScript, SQL, and APIs. I'm a passionate and enthusiastic developer, always eager to learn and build exciting projects.",
    },
    {
      title: 'How I work',
      content:
        "I enjoy collaborating with others, sharing ideas, and working on challenging problems. My workflow includes writing clean, maintainable code, following best practices, and continuously improving my skills. I value open communication and teamwork in every project.",
    },
    {
      title: 'Who can connect',
      content:
        "Anyone interested in technology, programming, or creative collaboration is welcome to connect with me. Whether you're experienced or just starting out, I believe in sharing knowledge and helping each other grow as developers.",
    },
  ];

  return (
    <Box minH="100vh" px={{ base: 4, md: 10 }} py={10} bg={bg}>
      <Heading
        as="h1"
        fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
        mb={12}
        color={textColor}
        textAlign="center"
      >
        ReadMe - About Me
      </Heading>

      <Flex
        direction={{ base: 'column', lg: 'row' }}
        gap={12}
        justify="center"
        align="stretch"
        flexWrap="wrap"
        maxW="7xl"
        mx="auto"
      >
        {sections.map((section, index) => (
          <Box
            key={index}
            bg={cardBg}
            p={6}
            rounded="lg"
            shadow="md"
            flexBasis={{ base: '100%', md: '45%', lg: '30%' }}
            transition="all 0.2s"
            _hover={{ shadow: 'xl' }}
            boxShadow="0 2px 6px rgba(0, 0, 0, 0.4), 0 12px 32px rgba(0, 0, 0, 0.4)"
            border="1px solid rgba(255, 255, 255, 0.13)"
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
          </Box>
        ))}
      </Flex>

       <Center mt={16}>
      <VStack spacing={4}>
        <Text fontSize={{sm:"xl",md:"2xl"}} fontWeight="semibold">
          Are you interested in connecting?
        </Text>
        <Button
          size={'md'}
          leftIcon={<FiUserPlus />}
          onClick={() => navigate('/contact')}
        >
          Contact me
        </Button>
      </VStack>
    </Center>
    </Box>
  );
};

export default ReadMe;
