import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Link, VStack, SimpleGrid, Heading, Icon } from '@chakra-ui/react';
// 1. Imported brand icons instead of the arrow
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Box h="300px" />;

  // 2. Updated data structure to include the icon component
  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/george-moysiadis', icon: FaLinkedin },
    { name: 'Github', url: 'https://github.com/georgemois23', icon: FaGithub },
    { name: 'Instagram', url: 'https://www.instagram.com/moisiadis.george/', icon: FaInstagram },
  ];

  // Visual constants
  const glassBg = 'rgba(28, 16, 52, 0.98)';
  const glassBorder = 'rgba(156, 114, 235, 0.62)';
  const textColor = '#F6EAFF';
  const accentText = '#D7A9FF';
  const linkColor = '#F0D8FF';
  const linkHover = '#FFFFFF';

  return (
    <Box
      as="footer"
      w="100%"
      minH="100vh"
      bg={glassBg}
      borderTop={`1px solid ${glassBorder}`}
      color={textColor}
      py={{ base: 5, md: 6 }}
      px={{ base: 4, md: 10, lg: 20 }}
      overflow="hidden"
      position="relative"
    >
      <Box maxW="container.xl" mx="auto" minH="calc(100vh - 48px)" display="flex" flexDirection="column" justifyContent="space-between">
        
        {/* BIG HEADLINE */}
        <Heading
          as="h1"
          fontSize={{ base: "11vw", md: "9vw", lg: "7vw" }} 
          lineHeight="0.9"
          fontWeight="600"
          letterSpacing="-0.02em"
          textTransform="uppercase"
          mb={6}
          pt={{base:6, md:0}}
          userSelect="none"
        >
          Moysiadis George
        </Heading>

        {/* DIVIDER */}
        <Box w="100%" h="1px" bg={glassBorder} mb={8} />

        {/* SUB-INFO */}
        <Flex 
          direction={{ base: "column", md: "row" }} 
          justify="space-between" 
          align={{ base: "start", md: "center" }}
          mb={{ base: 8, md: 14 }}
          fontSize={{ base: "xs", md: "sm" }}
          fontWeight="600"
          textTransform="uppercase"
          letterSpacing="wider"
          color={accentText}
        >
          <Text>Engineering & Development</Text>
          <Text mt={{ base: 2, md: 0 }}>Thessaloniki • Available for {new Date().getFullYear()}</Text>
        </Flex>

        {/* MAIN GRID */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 7, md: 10 }} w="100%">
          
          {/* LEFT COLUMN */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" color={accentText} mb={4}>Digital Connect</Text>
          </Box>

          {/* RIGHT COLUMN */}
          <VStack align="flex-start" spacing={16} w="100%">
            
            {/* 3. NEW SOCIAL PILLS SECTION */}
            <VStack align="flex-start" spacing={4} w="100%" maxW="400px">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  isExternal
                  w="100%"
                  color={linkColor}
                  _hover={{ textDecoration: "none" }}
                  role="group"
                >
                  {/* THE GLASS PILL CONTAINER */}
                  <Flex 
                    align="center" 
                    justify="space-between"
                    p={4}
                    borderRadius="xl"
                    bg="rgba(128, 72, 222, 0.55)"
                    border="1px solid rgba(214, 173, 255, 0.9)"
                    transition="all 0.3s ease"
                    _groupHover={{ 
                      bg: "rgba(154, 93, 255, 0.72)",
                      border: `1px solid rgba(242, 224, 255, 1)`,
                      transform: "translateY(-2px)"
                    }}
                  >
                    <Flex align="center" gap={4}>
                      <Icon as={link.icon} boxSize={6} />
                      <Text fontSize="xl" fontWeight="600">{link.name}</Text>
                    </Flex>
                    
                    {/* Subtle arrow to indicate it's a link */}
                    <Icon 
                        viewBox="0 0 24 24" 
                        boxSize={5} 
                        opacity={0}
                        transform="translateX(-10px)"
                        transition="all 0.3s ease"
                        _groupHover={{ opacity: 0.8, transform: "translateX(0)" }}
                    >
                        <path
                          fill="currentColor"
                          d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                        />
                    </Icon>
                  </Flex>
                </Link>
              ))}
            </VStack>

            {/* Email Section */}
            <Box mt={2}>
            <Text fontSize="lg" fontWeight="bold" color={accentText} mb={2}>Drop a line</Text>
              <Link 
                href="mailto:contact@moysiadis.dev" 
                color={linkColor}
                _hover={{ textDecoration: 'none', color: linkHover }}
                role="group"
              >
                <Text 
                  fontSize={{ base: "xl", md: "2xl", lg: "3xl" }} 
                  lineHeight="1"
                  wordBreak="break-word"
                  fontWeight="bold"
                  transition="color 0.2s ease"
                  _groupHover={{ color: linkHover }}
                >
                  contact@moysiadis.dev
                </Text>
              </Link>
            </Box>

          </VStack>
        </SimpleGrid>

        {/* COPYRIGHT */}
        <Box mt={{base: 8, md:16}} borderTop={`1px solid ${glassBorder}`} pt={6}>
            <Text fontSize="xs" color={accentText} textAlign="center">
             © {new Date().getFullYear()} Moysiadis George.
            </Text>
        </Box>

      </Box>
    </Box>
  );
};

export default Footer;