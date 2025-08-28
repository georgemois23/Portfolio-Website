// StarsBackground.jsx — responsive, Chakra v2 (JSX)
import React, { useMemo, useEffect, useState } from "react";
import { Box, usePrefersReducedMotion } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const floatUp = keyframes`
  from { transform: translateY(0); }
  to   { transform: translateY(-130vh); } /* extra travel so duplicates flow in */
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function StarsBackground({
  baseCount = 140,      // baseline on a 1280x720 viewport
  color = "#D6E3F0",
  background = "#0F1F2F",
  intensity = 1,        // multiplier for star count
}) {
  const reduce = usePrefersReducedMotion();

  // Track viewport to scale density with area
  const [vp, setVp] = useState({ w: 1280, h: 720 });
  useEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    let tid;
    const onResize = () => {
      clearTimeout(tid);
      tid = setTimeout(update, 100); // debounce
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const total = useMemo(() => {
    const refArea = 1280 * 720;
    const area = Math.max(1, vp.w * vp.h);
    const factor = Math.sqrt(area / refArea); // sublinear so phones don’t get too many
    return Math.round(baseCount * factor * intensity);
  }, [vp, baseCount, intensity]);

  const stars = useMemo(() => {
    const rand = mulberry32(12345);
    const arr = [];
    for (let i = 0; i < total; i++) {
      const left = (rand() * 100).toFixed(3) + "vw";            // vw for horizontal
      const top = (-10 + rand() * 120).toFixed(3) + "vh";       // -10vh..110vh fills bottom
      const size = `clamp(1px, ${(0.12 + rand() * 0.28).toFixed(3)}vw, 3px)`; // responsive 1px..~3px
      const blur = `${(0.3 + rand() * 1.7).toFixed(1)}px`;
      const opacity = (0.6 + rand() * 0.4).toFixed(2);
      const dur = (35 + rand() * 65).toFixed(1) + "s";
      const delay = (rand() * 30).toFixed(1) + "s";
      const twinkleDur = (2 + rand() * 3).toFixed(1) + "s";

      arr.push({ left, top, size, blur, opacity, dur, delay, twinkleDur });
    }
    return arr;
  }, [total]);

  return (
    <Box
      aria-hidden
      pointerEvents="none"
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={0}
      bg={background}
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        bgGradient:
          "linear(to-b, rgba(15,31,47,0.30), rgba(15,31,47,0) 35%, rgba(15,31,47,0) 65%, rgba(15,31,47,0.30))",
      }}
    >
      <Box position="absolute" inset={0} overflow="hidden">
        {stars.map((s, idx) => (
          <React.Fragment key={idx}>
            {/* main copy */}
            <Box
              position="absolute"
              left={s.left}
              top={s.top}
              width={s.size}
              height={s.size}
              bg={color}
              borderRadius="full"
              opacity={s.opacity}
              filter={`drop-shadow(0 0 ${s.blur} ${color})`}
              willChange="transform, opacity"
              animation={
                reduce
                  ? undefined
                  : `${floatUp} ${s.dur} linear ${s.delay} infinite, ${twinkle} ${s.twinkleDur} ease-in-out ${s.delay} infinite`
              }
            />
            {/* duplicate 100vh lower for seamless flow at bottom */}
            <Box
              position="absolute"
              left={s.left}
              top={`calc(${s.top} + 100vh)`}
              width={s.size}
              height={s.size}
              bg={color}
              borderRadius="full"
              opacity={s.opacity}
              filter={`drop-shadow(0 0 ${s.blur} ${color})`}
              willChange="transform, opacity"
              animation={
                reduce
                  ? undefined
                  : `${floatUp} ${s.dur} linear ${s.delay} infinite, ${twinkle} ${s.twinkleDur} ease-in-out ${s.delay} infinite`
              }
            />
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}
