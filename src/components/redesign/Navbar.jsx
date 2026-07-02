import { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { palette } from "../../theme/theme";
import Logo from '../../assets/logo/Logo';
import mlogo from '../../assets/images/m-logo.png';

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "resume", label: "Resume" },
];

 

// Floating pill navbar. Initials are derived from profile.name.
export default function Navbar({ profile, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 const isMobile = windowWidth < 992; 
  const size = isMobile 
    ? Math.min(windowWidth * 0.28, 128) 
    : Math.min(Math.max(windowWidth * 0.12, 120), 180);
  const width = size;
  const height = size;

  const initials = profile.name
    .split(" ")
    .map((word) => word[0])
    .join("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);

      const middle = window.innerHeight * 0.5;
      let current = "home";
      NAV_LINKS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= middle) current = id;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const reversedGradient = `linear-gradient(270deg, ${palette.accentFrom} 0%, ${palette.accentTo} 100%)`;

  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={50}
      justify="center"
      pt={{ base: 4, md: 6 }}
      px={4}
      pointerEvents="none"
    >
      <Flex
        pointerEvents="auto"
        display="inline-flex"
        alignItems="center"
        borderRadius="full"
        backdropFilter="blur(12px)"
        border="1px solid"
        borderColor="whiteAlpha.100"
        bg="portfolio.surface"
        px={2}
        py={2}
        boxShadow={scrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none"}
        transition="box-shadow 0.3s ease"
      >
        {/* Logo */}
        <Box
          as="button"
          onClick={() => onNavigate("home")}
          position="relative"
          w={10}
          h={10}
          borderRadius="full"
          p="2px"
          cursor="pointer"
          border="none"
          transition="transform 0.3s ease"
          style={{ background: palette.accentGradient }}
          _hover={{ transform: "scale(1.1)", background: reversedGradient }}
          aria-label="Home"
        >
          <Flex
            w="100%"
            h="100%"
            borderRadius="full"
            bg="portfolio.bg"
            align="center"
            justify="center"
          >
            <Text
              fontFamily="display"
              fontStyle="italic"
              fontSize="13px"
              color="portfolio.text"
              lineHeight="1"
            >
              {initials}
            </Text>
             {/* <Logo height={height} width={width}/> */}
             {/* <img src={mlogo} alt="Logo" style={{ width: `${width}px`, height: `${height}px`,  }} /> */}
          </Flex>
        </Box>

        <Box w="1px" h={5} bg="portfolio.stroke" mx={1} display={{ base: "none", sm: "block" }} />

        {/* Nav links */}
        {NAV_LINKS.map(({ id, label }) => (
          <Box
            key={id}
            as="button"
            onClick={() => onNavigate(id)}
            border="none"
            cursor="pointer"
            fontSize={{ base: "xs", sm: "sm" }}
            borderRadius="full"
            px={{ base: 3, sm: 4 }}
            py={{ base: 1.5, sm: 2 }}
            bg={active === id ? "portfolio.stroke/50" : "transparent"}
            color={active === id ? "portfolio.text" : "portfolio.muted"}
            transition="color 0.2s ease, background 0.2s ease"
            _hover={{ color: "portfolio.text", bg: "portfolio.stroke/50" }}
          >
            {label}
          </Box>
        ))}

        <Box w="1px" h={5} bg="portfolio.stroke" mx={1} display={{ base: "none", sm: "block" }} />

        {/* Say hi — scrolls to the contact form */}
        <Box
          as="button"
          onClick={() => onNavigate("contact-form")}
          border="none"
          bg="transparent"
          p={0}
          position="relative"
          display="inline-flex"
          borderRadius="full"
          cursor="pointer"
          css={{ "&:hover .navbar-ring": { opacity: 1 } }}
        >
          <Box
            className="navbar-ring animate-gradient-shift"
            position="absolute"
            inset="-2px"
            borderRadius="full"
            opacity={0}
            transition="opacity 0.25s ease"
            style={{ background: palette.accentGradient }}
            aria-hidden="true"
          />
          <Flex
            position="relative"
            align="center"
            gap={1.5}
            borderRadius="full"
            bg="portfolio.surface"
            backdropFilter="blur(12px)"
            fontSize={{ base: "xs", sm: "sm" }}
            px={{ base: 3, sm: 4 }}
            py={{ base: 1.5, sm: 2 }}
            color="portfolio.text"
          >
            Say hi <Box as="span" aria-hidden="true">↗</Box>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
