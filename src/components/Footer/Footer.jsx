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
  const glassBg = 'rgba(145, 109, 232, 0.6)';
  const glassBorder = 'rgba(255, 255, 255, 0.2)';
  const textColor = 'white'; 

  return (
    <Box
      as="footer"
      w="100%"
      bg={glassBg}
      css={{
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
      borderTop={`1px solid ${glassBorder}`}
      color={textColor}
      py={{ base: 6, md: 6 }}
      px={{ base: 6, md: 12, lg: 20 }}
      overflow="hidden"
      position="relative"
    >
      <Box maxW="container.xl" mx="auto">
        
        {/* BIG HEADLINE */}
        <Heading
          as="h1"
          fontSize={{ base: "13vw", md: "11vw", lg: "9vw" }} 
          lineHeight="0.9"
          fontWeight="400"
          letterSpacing="-0.02em"
          textTransform="uppercase"
          mb={8}
          pt={{base:12, md:0}}
          userSelect="none"
          textShadow="0 4px 20px rgba(0,0,0,0.1)"
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
          mb={{ base: 12, md: 20 }}
          fontSize={{ base: "sm", md: "md" }}
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing="wider"
          opacity={0.9}
        >
          <Text>Engineering & Development</Text>
          <Text mt={{ base: 2, md: 0 }}>Thessaloniki • Available for {new Date().getFullYear()}</Text>
        </Flex>

        {/* MAIN GRID */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="100%">
          
          {/* LEFT COLUMN */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" opacity={0.7} mb={4}>Digital Connect</Text>
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
                  _hover={{ textDecoration: "none" }}
                  role="group"
                >
                  {/* THE GLASS PILL CONTAINER */}
                  <Flex 
                    align="center" 
                    justify="space-between"
                    p={4}
                    borderRadius="xl"
                    bg="whiteAlpha.100" // Very subtle initial background
                    border="1px solid transparent"
                    transition="all 0.3s ease"
                    _groupHover={{ 
                      bg: "whiteAlpha.200", // Brighter on hover
                      border: `1px solid ${glassBorder}`, // Add border definition on hover
                      transform: "translateY(-3px)", // Subtle lift effect
                      boxShadow: "xl"
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
              <Text fontSize="lg" fontWeight="bold" opacity={0.7} mb={2}>Drop a line</Text>
              <Link 
                href="mailto:contact@moysiadis.dev" 
                _hover={{ textDecoration: 'none' }}
                role="group"
              >
                <Text 
                  fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} 
                  lineHeight="1"
                  wordBreak="break-word"
                  fontWeight="bold"
                  transition="opacity 0.3s"
                  _groupHover={{ opacity: 0.8 }}
                >
                  contact@moysiadis.dev
                </Text>
              </Link>
            </Box>

          </VStack>
        </SimpleGrid>

        {/* COPYRIGHT */}
        <Box mt={{base: 10, md:20}} borderTop={`1px solid ${glassBorder}`} pt={6}>
            <Text fontSize="xs" opacity={0.6} textAlign="center">
             © {new Date().getFullYear()} Moysiadis George.
            </Text>
        </Box>

      </Box>
    </Box>
  );
};

export default Footer;