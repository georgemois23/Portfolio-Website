import {
  Box,
  Text,
  Heading,
  Flex,
  HStack,
  VStack,
  Separator,
  Link,
  Code,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';    
    
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
  const bg = 'transparent';
  // const cardBg = 'rgba(42, 28, 74, 0.32)';
  const cardBg = 'rgba(42, 28, 74, 0.72)';
  const headingColor = 'brand.dark.secondary';
  const textColor = 'brand.dark.text';

  const sections = [
  {
    title: 'Who am I',
    content:
      "I'm a 4th-year Applied Informatics (Computer Science) student at the University of Macedonia. I have hands-on experience as a full-stack developer, building scalable applications using React, TypeScript, and NestJS. I have strong knowledge of HTML, CSS, JavaScript, SQL, APIs, and backend development with NestJS and PostgreSQL. I am passionate about clean architecture, maintainable code, and delivering practical solutions from concept to deployment.",
  },
  {
    title: 'How I work',
    content:
      "I enjoy collaborating with others, sharing ideas, and tackling challenging problems. I follow best practices, write clean and maintainable code, and continuously improve my skills. My workflow includes working with modern tools and frameworks, such as React, TypeScript, NestJS, GraphQL, Docker, and Redis. I value teamwork, open communication, and knowledge sharing in every project I work on.",
  },
  {
    title: 'Who can connect',
    content:
      "Anyone interested in technology, programming, or creative collaboration is welcome to connect. Whether you're experienced or just starting out, I enjoy sharing knowledge, contributing to open-source projects, and helping others grow as developers. I also welcome connections for internships, collaborations, or professional guidance in full-stack development.",
  },
];


  return (
    <Box minH="70vh" px={{ base: 3, sm: 3, md: 10 }} py={0} bg={bg}>
      <Box
        maxW="5xl"
        mx="auto"
        userSelect="none"
        border="1px solid"
        borderColor="whiteAlpha.300"
        borderRadius="lg"
        overflow="hidden"
        bg={cardBg}
      >
        <Flex
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          direction={{ base: "column", md: "row" }}
          px={{ base: 3, sm: 4, md: 6 }}
          py={{ base: 3, md: 4 }}
          gap={{ base: 2, md: 3 }}
          borderBottom="1px solid"
          borderColor="whiteAlpha.300"
        >
          <VStack align="start" gap={0}>
            <Heading as="h1" fontSize={{ base: "lg", sm: "xl", md: "2xl" }} color={textColor}>
              README.md
            </Heading>
            <Text fontSize={{ base: "xs", md: "sm" }} color={textColor} opacity={0.75}>
              georgemois23 / portfolio
            </Text>
          </VStack>

          <Flex gap={2} wrap="wrap">
            <Code colorScheme="purple" bg="whiteAlpha.200" color={textColor} fontSize={{ base: "2xs", sm: "xs" }}>
              React
            </Code>
            <Code colorScheme="purple" bg="whiteAlpha.200" color={textColor} fontSize={{ base: "2xs", sm: "xs" }}>
              TypeScript
            </Code>
            <Code colorScheme="purple" bg="whiteAlpha.200" color={textColor} fontSize={{ base: "2xs", sm: "xs" }}>
              NestJS
            </Code>
          </Flex>
        </Flex>

        <VStack align="stretch" px={{ base: 3, sm: 4, md: 8 }} py={{ base: 4, sm: 5, md: 8 }} gap={{ base: 4, md: 6 }}>
          <Box>
            <Heading as="h2" fontSize={{ base: "xl", sm: "2xl", md: "3xl" }} color={textColor} mb={2}>
              # Moysiadis George
            </Heading>
            <Text color={textColor} opacity={0.9} fontSize={{ base: "sm", md: "md" }} lineHeight={{ base: "1.7", md: "1.8" }}>
              Building practical, scalable web applications with modern frontend and backend technologies.
            </Text>
          </Box>

          <Flex wrap="wrap" gap={{ base: 2, md: 4 }} fontSize={{ base: "sm", md: "md" }}>
            <Link color={headingColor} _hover={{ opacity: 0.85 }}>
              About
            </Link>
            <Link color={headingColor} _hover={{ opacity: 0.85 }}>
              Workflow
            </Link>
            <Link color={headingColor} _hover={{ opacity: 0.85 }}>
              Connect
            </Link>
          </Flex>

          <Separator borderColor="whiteAlpha.300" />

          {sections.map((section, index) => (
            <Box key={index}>
              <Heading as="h3" fontSize={{ base: "md", md: "lg" }} mb={3} color={headingColor}>
                ## {section.title}
              </Heading>
              <Text textAlign="left" color={textColor} opacity={0.95} lineHeight={{ base: "1.75", md: "1.9" }} fontSize={{ base: "sm", md: "md" }}>
                {section.content}
              </Text>
            </Box>
          ))}

          <Separator borderColor="whiteAlpha.300" />

          <Box
            border="1px solid"
            borderColor="whiteAlpha.300"
            borderRadius="md"
            bg="blackAlpha.300"
            p={{ base: 3, md: 4 }}
            fontFamily="monospace"
            fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
            color={textColor}
            whiteSpace="pre-wrap"
            overflowX="auto"
          >
{`// quick summary
role: Full-Stack Developer
focus: React, TypeScript, NestJS
interests: scalable architecture, clean code, collaboration`}
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default ReadMe;
