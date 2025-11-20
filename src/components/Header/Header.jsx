import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Flex, IconButton, useOutsideClick } from "@chakra-ui/react"; // Added useOutsideClick
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NAV_ITEMS } from "../../config/navigationConfig";
import { NavItem } from "./NavItem";
import { motion, AnimatePresence } from "framer-motion";
import { HeaderMenu } from "./HeaderMenu";
import Logo from '../../assets/logo/Logo';

// Create a motion component from Chakra's Flex
const MotionFlex = motion(Flex);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // --- REF FOR OUTSIDE CLICK ---
  const headerRef = useRef();

  useOutsideClick({
    ref: headerRef,
    handler: () => setIsMenuOpen(false),
  });
  // ---------------------------

  // --- Close menu when route changes ---
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // --- Resize listener ---
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
        if(window.innerWidth > 992) setIsMenuOpen(false);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 992; 
  const size = isMobile 
    ? Math.min(windowWidth * 0.35, 160) 
    : Math.min(Math.max(windowWidth * 0.12, 120), 180);
  const width = size;
  const height = size;

  // --- ANIMATION VARIANTS ---
  const headerVariants = {
    closed: { 
        height: isMobile ? "70px" : "80px", 
        width: isMobile ? "75%" : "70%", 
        borderRadius: "50px",
        transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    open: { 
        height: "auto", 
        width: isMobile ? "95%" : "70%", 
        borderRadius: "25px", 
        transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  return (
    <Box as="section" mb={{ base: 12, md: 16 }} mt={0}>
      <Flex direction={{ base: "column", lg: "row" }}>
        
        <MotionFlex
          as="header"
          // --- ATTACH REF HERE ---
          ref={headerRef} 
          // ---------------------
          variants={headerVariants}
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
          
          direction="column"
          position="fixed"
          top="0"
          left="50%"
          style={{ x: "-50%" }} 
          
          maxW={"800px"}
          
          margin={"2rem auto .25rem"}
          paddingX={{ xs: '1rem', sm: "2rem" }}
          zIndex="999"

          backgroundColor='rgba(145, 109, 232, 0.5)'
          backdropFilter='blur(8px)'
          sx={{ WebkitBackdropFilter: 'blur(8px)' }}
          border={`1px solid brand.dark.secondary`}
          fontFamily="Arial"
          overflow="hidden" 
        >
          
          {/* --- TOP ROW --- */}
          <Flex 
            width="100%" 
            align="center" 
            justify={{ base: "flex-end", lg: "space-between" }}
            height={{ base: "70px", lg: "80px" }} 
            flexShrink={0}
            position="relative"
          >
             
             {/* LOGO */}
             <Box 
               flexShrink={0}
               position={{ base: "absolute", lg: "static" }}
               left={{ base: "50%", lg: "auto" }}
               transform={{ base: "translateX(-50%)", lg: "none" }}
               zIndex={1}
             >
                 <Logo height={height} width={width} />
             </Box>

             {/* DESKTOP NAV */}
             <Flex justify={{ base: "center", lg: "flex-end" }}>
                <NavSection items={NAV_ITEMS.slice(0, 3)} />
             </Flex>

             {/* HAMBURGER ICON */}
             <IconButton
                icon={isMenuOpen ? <CloseIcon boxSize={4} /> : <HamburgerIcon boxSize={5} />}
                display={{ base: "flex", lg: "none" }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMobileMenu();
                }}
                variant="ghost"
                color="brand.dark.text"
                isRound
                minW="48px"
                minH="48px"
                zIndex={9999}
                pl={6}
                _hover={{ bg: "transparent" }}
                _active={{ bg: "transparent", transform: "scale(0.9)" }}
                transition="all 0.2s"
             />
          </Flex>

          {/* COLLAPSIBLE MENU */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, delay: 0.1 }} 
              >
                 <Box pb={6}> 
                    <HeaderMenu />
                 </Box>
              </motion.div>
            )}
          </AnimatePresence>

        </MotionFlex>
      </Flex>
    </Box>
  );
}

const NavSection = ({ items }) => {
  const navigate = useNavigate();
  
  return (
    <Flex
      gap={6}
      align="center"
      flex="1"
      justify="center"
      display={{ base: "none", lg: "flex" }}
      fontWeight={400}
      position="relative"
      zIndex="1"
      userSelect={'none'}
    >
      {items.map((item) => (
        <NavItem key={item.path} item={item} icon={item.icon} />
      ))}
    </Flex>
  );
}