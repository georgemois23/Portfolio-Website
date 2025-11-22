import React, { useMemo, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

// 1. Custom Hook Replacement (since v3 removed it)
function usePrefersReducedMotion() {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMatches(media.matches);
    const listener = (e) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);
  return matches;
}

const floatUp = keyframes`
  from { transform: translateY(0); }
  to   { transform: translateY(-130vh); }
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
  baseCount = 140,
  color = "#D6E3F0",
  background = "#000000",
  intensity = 1,
}) {
  const reduce = usePrefersReducedMotion();

  const [vp, setVp] = useState({ w: 1280, h: 720 });
  useEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    let tid;
    const onResize = () => {
      clearTimeout(tid);
      tid = setTimeout(update, 100);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const total = useMemo(() => {
    const refArea = 1280 * 720;
    const area = Math.max(1, vp.w * vp.h);
    const factor = Math.sqrt(area / refArea);
    return Math.round(baseCount * factor * intensity);
  }, [vp, baseCount, intensity]);

  const stars = useMemo(() => {
    const rand = mulberry32(12345);
    const arr = [];
    for (let i = 0; i < total; i++) {
      const left = (rand() * 100).toFixed(3) + "vw";
      const top = (-10 + rand() * 120).toFixed(3) + "vh";
      const size = `clamp(4px, ${(0.12 + rand() * 0.28).toFixed(3)}vw, 3px)`;
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
        // 2. Updated to standard CSS syntax for v3
        background: "linear-gradient(to bottom, rgba(15,31,47,0.30), rgba(15,31,47,0))",
      }}
    >
      <Box position="absolute" inset={0} overflow="hidden">
        {stars.map((s, idx) => (
          <React.Fragment key={idx}>
            {/* main copy */}
            <Box
              as="span"
              position="absolute"
              left={s.left}
              top={s.top}
              fontSize={s.size}
              color={color}
              opacity={s.opacity}
              textShadow={`0 0 ${s.blur} ${color}`}
              willChange="transform, opacity"
              animation={
                reduce
                  ? undefined
                  : `${floatUp} ${s.dur} linear ${s.delay} infinite, ${twinkle} ${s.twinkleDur} ease-in-out ${s.delay} infinite`
              }
            >
              {"<>"}
            </Box>

            {/* duplicate 100vh lower for seamless flow */}
            <Box
              as="span"
              position="absolute"
              left={s.left}
              top={`calc(${s.top} + 100vh)`}
              fontSize={s.size}
              color={color}
              opacity={s.opacity}
              textShadow={`0 0 ${s.blur} ${color}`}
              willChange="transform, opacity"
              animation={
                reduce
                  ? undefined
                  : `${floatUp} ${s.dur} linear ${s.delay} infinite, ${twinkle} ${s.twinkleDur} ease-in-out ${s.delay} infinite`
              }
            >
              {"</>"}
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}