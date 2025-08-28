import { useState,useEffect,useRef} from "react";
import { Outlet, useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Box, Flex, Image, IconButton, useDisclosure, Text } from "@chakra-ui/react";
import { HamburgerIcon, ChevronDownIcon,ChevronUpIcon } from "@chakra-ui/icons";
import { MenuDrawer } from "./MenuDrawer";  
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { NAV_ITEMS } from "../../config/navigationConfig";
import  { ToolTipUnderConstruction } from "../ToolTipUnderConstruction";
import { NavItem } from "./NavItem";
import Footer from "../Footer/Footer";
  import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
const location = useLocation();
  
  useEffect(() => {
    onClose();
  }, [location.pathname]);
  const goToHomePage = () => {
  navigate("/");
  onClose(); 
};
  const toggleMobileMenu = () => {
  if (isOpen) {
    onClose();
  } else {
    onOpen();
  }
};
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);  
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box>
      <Flex
        as="header"
        position="sticky"
        // top="10rem"  
        // left="50%"
        // transform="translateX(-50%)"
        borderRadius={"9999px"}
        w={{ base: "80%", md: "70%" }}
        maxW={"800px"}
        align="center"
        margin={"2rem auto .25rem"}
        justify={{md:"center",lg:"space-between"}}
        paddingX="2rem"
        // paddingY="1rem"
        zIndex="999"
        // backgroundColor='rgba(0, 10, 38, 0.98)'
        
        // backgroundColor={scrolled ? "rgba(237, 233, 222, 0.5)" : "rgba(0, 12, 45, 0.98)"}
        // backgroundColor={"rgba(237, 233, 222, 0.5)"}
        // backgroundColor={"rgba(0, 10, 38, 0.93)"}
        // backgroundColor= 'rgba(15, 31, 47, 0.8)'
        backgroundColor= 'rgba(167, 139, 250, 0.6)'
        backdropFilter= 'blur(8px)'
        border={`1px solid brand.dark.secondary`}

        // backdropFilter={scrolled ? "blur(9px)" : "none"}
        transition="background-color 0.3s ease, backdrop-filter 0.3s ease"
        height={{base:"70px", lg:"80px"}}
        fontFamily="Arial"
      >
         <Text
            fontSize={{ base: "1.2rem", lg: "2rem" }}
            fontWeight="bold"
            color="brand.dark.text"
            // _hover={{ color: "brand.dark.secondary" }}
            transition="color 0.3s ease"
            fontFamily="'Sedgwick Ave Display', cursive"
            userSelect={'none'}
            onClick={goToHomePage}
          >
            
            Moysiadis George
              </Text>
        {/* Left Navigation (Desktop) */}
        <Flex
        justify={{ base: "center", lg: "flex-end" }}
        
        >
        <NavSection items={NAV_ITEMS.slice(0, 3)}  />
</Flex>
       
       

        {/* Mobile Menu Button */}
        <IconButton
          icon={<HamburgerIcon boxSize={5} />}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          display={{ base: "flex", lg: "none" }}
          onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          toggleMobileMenu();
        }}
          variant="ghost"
          color="brand.dark.text"
          ml="auto"
          isRound
           minW="48px"
           minH="48px" 
           zIndex={9999}
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent",transform: "scale(0.9)"}}
        _focus={{ boxShadow: "none" }}
        transition="all 0.2s"
        position="relative"
        />
      </Flex>

      <MenuDrawer isOpen={isOpen} onClose={onClose} />

     
    </Box>
  );
}

const NavSection = ({ items, sourcesItems }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const timeoutRef = useRef(null);

const handleMouseLeave = () => {
  timeoutRef.current = setTimeout(onClose, 300); // Delay close
};

const handleMouseEnter = () => {
  clearTimeout(timeoutRef.current); 
  onOpen();
};
   const location = useLocation();
  return(
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
);}