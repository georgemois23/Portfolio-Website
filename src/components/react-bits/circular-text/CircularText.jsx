import { useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "motion/react";

const getRotationTransition = (duration, from, loop = true) => ({
  from,
  to: from + 360,
  ease: "linear",
  duration,
  type: "tween",
  repeat: loop ? Infinity : 0,
});

const getTransition = (duration, from) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: "spring",
    damping: 20,
    stiffness: 300,
  },
});

const CircularText = ({ text, spinDuration = 20, onHover = "speedUp", className = "" }) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  }, [spinDuration, text, onHover, controls, rotation]);

  const handleHoverStart = () => {
    const start = rotation.get();
    if (!onHover) return;

    let transitionConfig;
    let scaleVal = 1;

    switch (onHover) {
      case "slowDown":
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case "speedUp":
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case "pause":
        transitionConfig = {
          rotate: { type: "spring", damping: 20, stiffness: 300 },
          scale: { type: "spring", damping: 20, stiffness: 300 },
        };
        scaleVal = 1;
        break;
      case "goBonkers":
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig,
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  };

  return (
    <>
      <style>
        {`
          .circular-text {
            width: 220px;
            height: 220px;
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            user-select: none;
          }

          .circular-text span {
            position: absolute;
            left: 50%;
            top: 50%;
            transform-origin: 0 0;
            color: #f0d8ff;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: 15px;
            font-weight: 700;
            line-height: 1;
            pointer-events: none;
          }

          @media (max-width: 768px) {
            .circular-text {
              width: 130px;
              height: 130px;
            }

            .circular-text span {
              font-size: 9px;
            }
          }

          @media (max-width: 420px) {
            .circular-text {
              width: 122px;
              height: 122px;
            }

            .circular-text span {
              font-size: 12px;
            }
          }

          @media (max-width: 310px) {
            .circular-text {
              width: 96px;
              height: 96px;
            }

            .circular-text span {
              font-size: 7px;
            }
          }
        `}
      </style>

      <motion.div
        className={`circular-text ${className}`.trim()}
        style={{ rotate: rotation }}
        initial={{ rotate: 0 }}
        animate={controls}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        userSelect="none"
      >
        {letters.map((letter, i) => {
          const rotationDeg = (360 / letters.length) * i;
          const radius =
            typeof window !== "undefined"
              ? window.innerWidth <= 420
                ? window.innerWidth <= 310
                  ? 41
                  : 48
                : window.innerWidth <= 768
                ? 56
                : 97
              : 97;
          const transform = `rotate(${rotationDeg}deg) translateY(-${radius}px)`;
          return (
            <span key={i} style={{ transform, WebkitTransform: transform }}>
              {letter}
            </span>
          );
        })}
      </motion.div>
    </>
  );
};

export default CircularText;
