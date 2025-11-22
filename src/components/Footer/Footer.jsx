import React, { useEffect, useState } from 'react';
import { Flex, Box, Text, useBreakpointValue, Icon } from '@chakra-ui/react';
import { FaInstagram, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import SocialMediaLink from './FooterSocial';
import Logo from '../../assets/logo/Logo';

const Footer = () => {
  const [mounted, setMounted] = useState(false);

  const logoSize = useBreakpointValue({ base: 120, md: 150, lg: 180 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Box h="80px" w="100%" />;
  }

  return (
    <Flex
      as="footer"
      direction="column"
      align="center"
      py={8}
      px={{ base: 4, md: 8 }}
      bg='rgba(145, 109, 232, 0.6)'
      // 3. In v3, 'css' prop is preferred over 'sx' for arbitrary values
      css={{
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
      borderTop="1px solid rgba(145, 109, 232, 0.4)"
      width="100%"
      gap={6}
      minH="fit-content"
      userSelect="none"
      color="brand.dark.text"
    >
      <Flex
        align="flex-start"
        justify="center"
        width="100%"
        maxW="container.xl"
        gap={8}
        direction={{ base: "column", md: "row" }}
        flexWrap="wrap"
      >
        
        {/* LOGO BOX */}
        <Box flexShrink={0}>
          <Logo height={logoSize} width={logoSize} />
        </Box>
        
        <Flex 
          direction="row" 
          gap={{ base: 6, md: 12 }}
          flex="1"
          flexWrap="wrap"
        >
          
          <Box flex="1" minW="160px">
            <Text fontSize="sm" fontWeight="bold" mb={3} userSelect="none">
              CONTACT
            </Text>
            <Flex direction="column" gap={2}>
              <Flex align="center" gap={2} >
                {/* Replaced EmailIcon with Icon + React Icon */}
                <Icon as={FaEnvelope} boxSize={4} />
                <Text as="a" href="mailto:contact@moysiadis.dev" fontSize="sm" wordBreak="break-word">
                  contact@moysiadis.dev
                </Text>
              </Flex>
            </Flex>
          </Box>


          <Box flex="1" minW="200px">
            <Text fontSize="sm" fontWeight="bold" mb={3} userSelect="none">
              SOCIAL MEDIA
            </Text>
            <Flex direction="column" gap={3} >
             <SocialMediaLink
                icon={<FaLinkedin size="16px" />}
                url="https://www.linkedin.com/in/george-moysiadis"
                label='george-moysiadis'
              />
              <SocialMediaLink
                icon={<FaGithub size="16px" />}
                url="https://github.com/georgemois23"
                label="georgemois23"
              />
               <SocialMediaLink
                icon={<FaInstagram size="16px" />}
                url="https://www.instagram.com/moisiadis.george/"
                label="moisiadis.george"
              />
            </Flex>
          </Box>
        </Flex>

      </Flex>

      <Text fontSize="xs" textAlign="center" mt={4} userSelect="none">
        Moysiadis George I  © All rights reserved {new Date().getFullYear()} 
      </Text>
    </Flex>
  );
};

export default Footer;