import { useEffect, useRef, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { palette } from "../../theme/theme";
import Logo from '../../assets/logo/Logo';

const MotionBox = motion.create(Box);

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "resume", label: "Resume" },
];

// Crop of the logo SVG's 1024×1024 canvas down to the wordmark's measured
// ink bounds (x 108–912, y 332–684) plus a little padding, so it renders
// at a legible size inside the small navbar pill.
const LOGO_VIEWBOX = "100 324 820 368";

// Floating pill navbar with the logo wordmark.
export default function Navbar({ profile, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (id) => {
    setMenuOpen(false);
    onNavigate(id);
  };

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
      direction="column"
      align="center"
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
        {/* Logo — same 40px height as before, pill-shaped to fit the wordmark */}
        <Box
          as="button"
          onClick={() => handleNavigate("home")}
          position="relative"
          h={10}
          borderRadius="full"
          p="2px"
          cursor="pointer"
          border="none"
          transition="transform 0.3s ease"
          style={{ background: palette.purple }}
          _hover={{ transform: "scale(1.05)", background: 'red' }}
          aria-label={`${profile.name} — Home`}
        >
          <Flex
            h="100%"
            borderRadius="full"
            bg="portfolio.bg"
            align="center"
            justify="center"
            px={3}
          >
            <Logo color={palette.text} viewBox={LOGO_VIEWBOX} height="20" width="45" />
          </Flex>
        </Box>

        <Box w="1px" h={5} bg="portfolio.stroke" mx={1} display={{ base: "none", md: "block" }} />

        {/* Nav links — desktop only */}
        {NAV_LINKS.map(({ id, label }) => (
          <Box
            key={id}
            as="button"
            onClick={() => handleNavigate(id)}
            display={{ base: "none", md: "inline-flex" }}
            border="none"
            cursor="pointer"
            fontSize="sm"
            borderRadius="full"
            px={4}
            py={2}
            bg={active === id ? "portfolio.stroke/50" : "transparent"}
            color={active === id ? "portfolio.text" : "portfolio.muted"}
            transition="color 0.2s ease, background 0.2s ease"
            _hover={{ color: "portfolio.text", bg: "portfolio.stroke/50" }}
          >
            {label}
          </Box>
        ))}

        <Box w="1px" h={5} bg="portfolio.stroke" mx={1} display={{ base: "none", md: "block" }} />

        {/* Burger — mobile only */}
        <Box
          as="button"
          onClick={() => setMenuOpen((open) => !open)}
          display={{ base: "inline-flex", md: "none" }}
          alignItems="center"
          justifyContent="center"
          w={10}
          h={10}
          ml={1}
          border="none"
          bg="transparent"
          borderRadius="full"
          cursor="pointer"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <Flex direction="column" gap="5px" align="center" justify="center">
            <Box
              w="16px"
              h="1.5px"
              bg="portfolio.text"
              transition="transform 0.25s ease"
              transform={menuOpen ? "translateY(3.25px) rotate(45deg)" : "none"}
            />
            <Box
              w="16px"
              h="1.5px"
              bg="portfolio.text"
              transition="transform 0.25s ease"
              transform={menuOpen ? "translateY(-3.25px) rotate(-45deg)" : "none"}
            />
          </Flex>
        </Box>

        {/* Say hi — scrolls to the contact form (desktop only) */}
        <Box
          as="button"
          onClick={() => handleNavigate("contact-form")}
          border="none"
          bg="transparent"
          p={0}
          position="relative"
          display={{ base: "none", md: "inline-flex" }}
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

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <MotionBox
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            display={{ base: "block", md: "none" }}
            pointerEvents="auto"
            mt={2}
            w="min(92vw, 300px)"
            borderRadius="24px"
            border="1px solid"
            borderColor="whiteAlpha.100"
            bg="portfolio.surface"
            backdropFilter="blur(12px)"
            boxShadow="0 12px 32px rgba(0, 0, 0, 0.35)"
            p={2}
          >
            {NAV_LINKS.map(({ id, label }) => (
              <Box
                key={id}
                as="button"
                onClick={() => handleNavigate(id)}
                display="block"
                w="100%"
                textAlign="center"
                border="none"
                cursor="pointer"
                fontSize="sm"
                borderRadius="full"
                px={4}
                py={3}
                bg={active === id ? "portfolio.stroke/50" : "transparent"}
                color={active === id ? "portfolio.text" : "portfolio.muted"}
                transition="color 0.2s ease, background 0.2s ease"
                _hover={{ color: "portfolio.text", bg: "portfolio.stroke/50" }}
              >
                {label}
              </Box>
            ))}

            <Box h="1px" bg="portfolio.stroke" mx={3} my={2} />

            <Box
              as="button"
              onClick={() => handleNavigate("contact-form")}
              display="block"
              w="100%"
              textAlign="center"
              border="none"
              cursor="pointer"
              fontSize="sm"
              fontWeight="500"
              borderRadius="full"
              px={4}
              py={3}
              bg="portfolio.text"
              color="portfolio.bg"
              transition="opacity 0.2s ease"
              _hover={{ opacity: 0.9 }}
            >
              Say hi <Box as="span" aria-hidden="true">↗</Box>
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </Flex>
  );
}
