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
  const cardBg = 'linear-gradient(120deg, rgb(7, 8, 16) 0%, rgb(13, 11, 24) 48%, rgb(6, 10, 20) 100%)';
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

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) {
      const headerOffset = window.innerWidth < 992 ? 110 : 90;
      const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };


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
        position="relative"
      >
        <Box
          position="absolute"
          top="-120px"
          left="-140px"
          w={{ base: "220px", md: "340px" }}
          h={{ base: "220px", md: "340px" }}
          borderRadius="full"
          bg="radial-gradient(circle, rgba(145,109,232,0.24) 0%, rgba(145,109,232,0) 72%)"
          pointerEvents="none"
        />
        <Box
          position="absolute"
          right="-120px"
          bottom="-140px"
          w={{ base: "230px", md: "360px" }}
          h={{ base: "230px", md: "360px" }}
          borderRadius="full"
          bg="radial-gradient(circle, rgba(95,170,255,0.2) 0%, rgba(95,170,255,0) 72%)"
          pointerEvents="none"
        />
        <Box position="relative" zIndex={1}>
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
            <Link color={headingColor} _hover={{ opacity: 0.85 }} onClick={() => scrollToSection("readme-about")}>
              About
            </Link>
            <Link color={headingColor} _hover={{ opacity: 0.85 }} onClick={() => scrollToSection("readme-workflow")}>
              Workflow
            </Link>
            <Link color={headingColor} _hover={{ opacity: 0.85 }} onClick={() => scrollToSection("readme-connect")}>
              Connect
            </Link>
          </Flex>

          <Separator borderColor="whiteAlpha.300" />

          {sections.map((section, index) => (
            <Box
              key={index}
              id={
                section.title === "Who am I"
                  ? "readme-about"
                  : section.title === "How I work"
                  ? "readme-workflow"
                  : "readme-connect"
              }
            >
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
    </Box>
  );
};

export default ReadMe;
