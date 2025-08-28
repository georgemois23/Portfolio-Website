import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerFooter,
    Box,
    Text,
    Image,
    Button,
  } from "@chakra-ui/react";
  import { useBreakpointValue } from '@chakra-ui/react';
  import { ChevronDownIcon, ExternalLinkIcon,InfoIcon,ChevronUpIcon} from '@chakra-ui/icons';
  import { Menu, MenuButton, MenuList, MenuItem,Flex } from '@chakra-ui/react';
  import { NAV_ITEMS, SOURCES_MENU_ITEMS } from "../../config/navigationConfig";
  import { NavItem } from "./NavItem";
  import  {useNavigate,useLocation} from "react-router-dom";
  import { ToolTipUnderConstruction } from "../ToolTipUnderConstruction";
  import { motion, AnimatePresence } from "framer-motion";
  import {CloseIcon} from "../../assets/icons";
  
  export function MenuDrawer({ isOpen, onClose }) {
    const navigate = useNavigate();
    const location = useLocation();
    const goToHomePage = () => {
      navigate("/");
      onClose();
    };
    const MotionDrawerContent = motion(DrawerContent);
  
    return (
      <Drawer onClose={onClose} isOpen={isOpen} placement="bottom" size={'sm'} closeOnBlur >
        <DrawerOverlay />
        <DrawerContent sx={{
          zIndex: '99999 !important',
          // bg: 'brand.dark.primary',
          // bg: 'brand.dark.secondary',
          bg: 'rgba(167, 139, 250, 0.6)',
          width: "100%",
          backdropFilter: "blur(20px)",
          maxH:"400px" ,
          borderBottomRadius:"sm"
        }}>
          <DrawerCloseButton sx={{ zIndex: 9999 }}  />
          <DrawerHeader fontWeight={800} opacity={1} textAlign={"center"} onClick={goToHomePage}>
           <Text
            fontSize={{ base: "1.5rem", lg: "2rem" }}
            fontWeight="bold"
            color="brand.dark.text"
            _hover={{ color: "brand.dark.secondary" }}
            transition="color 0.3s ease"
            fontFamily="'Sedgwick Ave Display', cursive"
          >
            
            Moysiadis George
              </Text>
          </DrawerHeader>
          {/* <DrawerBody userSelect={'none'}> */}
          <DrawerBody 
  userSelect="none" 
  display="flex" 
  flexDirection="column" 
  overflow="hidden" 
  p={0}
>
  <Box flex="1" overflowY="auto" px={4} py={4}>
          <Flex
            direction="column"
            align="center"
            justify={"center"}
            width="90%"
            pt={4}
            maxW="300px"
            gap={{xs:2,sm:3}} 
            marginInline={"auto"}
          >
            {NAV_ITEMS.map((item) => (
              <Box 
                key={item.path} 
                width="100%"
                marginInline={"auto"}
                textAlign="center"
              >
                <NavItem 
                  item={item} 
                  onClose={onClose} 
                  isMobile 
                />
              </Box>
            ))}
              
             
  
              {/* <Text position="absolute" bottom="8vh" fontWeight={200}>
                <InfoIcon pb="0.5" fontSize="18px" /> Σελίδα υπο κατασκευή
              </Text> */}
            </Flex>
            </Box>
          </DrawerBody>
          {/* <DrawerFooter
                    justifyContent={"center"}
                >
                    <Button
                        onClick={onClose}
                        variant="ghost"
                        fontWeight="bold"
                        fontFamily="Syne"
                        fontSize={{ base: "sm", lg: "lg" }}
                        _hover={false}
                        leftIcon={<Box ml="0.5rem" pt="0.4rem">
                            <CloseIcon />
                        </Box>}
                    >
                        ΚΛΕΙΣΙΜΟ
                    </Button>
                </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    );
  }