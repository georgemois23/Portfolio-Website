import { useEffect, useRef, useState } from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import { useInView } from "framer-motion";
import { FadeIn, headingGradientCss } from "./SelectedWorks";
import { palette } from "../../theme/theme";

// D7E2EA at low alpha, matching the section hairlines.
const hairline = `${palette.showcaseBorder}33`;

// Counts from 0 to the numeric part of the value when scrolled into view,
// keeping any suffix ("4+" → counts to 4, renders "+").
function CountUp({ value }) {
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : String(value);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const duration = 1400;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <Box as="span" ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {display}
      {suffix}
    </Box>
  );
}

// 3-column stats strip in the showcase aesthetic; values come from profile.stats.
export default function StatsSection({ stats }) {
  if (!stats || stats.length === 0) return null;

  return (
    <Box
      as="section"
      style={{ backgroundColor: palette.showcaseBg }}
      pt={{ base: 4, md: 6 }}
      pb={{ base: 16, md: 24 }}
    >
      <Grid
        templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }}
        gap={{ base: 10, md: 6 }}
        maxW="1200px"
        mx="auto"
        px={{ base: 4, sm: 6, md: 10 }}
      >
        {stats.map((stat, index) => (
          <FadeIn key={stat.label} delay={index * 0.12} y={24}>
            <Box textAlign="center">
              <Text
                fontFamily="kanit"
                fontWeight="900"
                lineHeight="0.9"
                fontSize="clamp(3.5rem, 8vw, 6.5rem)"
                css={headingGradientCss}
              >
                <CountUp value={stat.value} />
              </Text>
              <Box
                w={12}
                h="1px"
                mx="auto"
                my={{ base: 4, md: 5 }}
                style={{ backgroundColor: hairline }}
              />
              <Text
                fontFamily="kanit"
                fontWeight="500"
                fontSize={{ base: "xs", md: "sm" }}
                color="portfolio.muted"
                textTransform="uppercase"
                letterSpacing="0.25em"
              >
                {stat.label}
              </Text>
            </Box>
          </FadeIn>
        ))}
      </Grid>
    </Box>
  );
}
