import { Box, Flex } from "@chakra-ui/react";
import { NAV_ITEMS } from "../../config/navigationConfig";
import { NavItem } from "./NavItem";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export const HeaderMenu = () => {
    // Animation for staggering items (optional but looks premium)
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemAnim = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <Flex
            as={motion.div}
            variants={container}
            initial="hidden"
            animate="show"
            direction="column"
            align="center"
            justify={"center"}
            width="90%"
            pt={2} // Reduced padding top slightly since header has space
            maxW="300px"
            gap={{ xs: 2, sm: 3 }}
            marginInline={"auto"}
        >
            {NAV_ITEMS.map((item) => (
                <MotionBox
                    key={item.path}
                    variants={itemAnim}
                    width="100%"
                    marginInline={"auto"}
                    textAlign="center"
                >
                    <NavItem
                        item={item}
                        isMobile
                    />
                </MotionBox>
            ))}

            {/* <Text position="absolute" bottom="8vh" fontWeight={200}>
                <InfoIcon pb="0.5" fontSize="18px" /> Σελίδα υπο κατασκευή
            </Text> */}
        </Flex>
    )
}