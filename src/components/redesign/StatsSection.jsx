import { Box, Grid, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { palette } from "../../theme/theme";

const MotionBox = motion.create(Box);

// 3-column stats strip; values come from profile.stats.
export default function StatsSection({ stats }) {
  if (!stats || stats.length === 0) return null;

  return (
    <Box as="section" bg="portfolio.bg" py={{ base: 16, md: 24 }}>
      <Grid
        templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }}
        gap={{ base: 10, md: 6 }}
        maxW="1000px"
        mx="auto"
        px={{ base: 6, md: 10, lg: 16 }}
      >
        {stats.map((stat, index) => (
          <MotionBox
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            textAlign="center"
          >
            <Text
              fontFamily="display"
              fontStyle="italic"
              fontSize={{ base: "5xl", md: "6xl" }}
              color="portfolio.text"
              lineHeight="1"
            >
              {stat.value}
            </Text>
            <Box
              w={10}
              h="2px"
              mx="auto"
              my={4}
              borderRadius="full"
              className="animate-gradient-shift"
              style={{ background: palette.accentGradient }}
            />
            <Text
              fontSize="xs"
              color="portfolio.muted"
              textTransform="uppercase"
              letterSpacing="0.2em"
            >
              {stat.label}
            </Text>
          </MotionBox>
        ))}
      </Grid>
    </Box>
  );
}
