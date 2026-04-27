const GlitchText = ({
  children,
  speed = 1,
  enableShadows = true,
  enableOnHover = true,
  className = "",
}) => {
  const inlineStyles = {
    "--after-duration": `${Math.max(speed, 0.1) * 3}s`,
    "--before-duration": `${Math.max(speed, 0.1) * 2}s`,
    "--after-shadow": enableShadows ? "-5px 0 red" : "none",
    "--before-shadow": enableShadows ? "5px 0 cyan" : "none",
  };

  const hoverClass = enableOnHover ? "enable-on-hover" : "";

  return (
    <>
      <style>
        {`
          .glitch {
            position: relative;
            display: inline-block;
            line-height: inherit;
          }

          .glitch::before,
          .glitch::after {
            content: attr(data-text);
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: 0;
          }

          .glitch::before {
            text-shadow: var(--before-shadow, none);
            animation: glitch-before var(--before-duration, 2s) infinite linear alternate-reverse;
          }

          .glitch::after {
            text-shadow: var(--after-shadow, none);
            animation: glitch-after var(--after-duration, 3s) infinite linear alternate-reverse;
          }

          .glitch.enable-on-hover::before,
          .glitch.enable-on-hover::after {
            animation-play-state: paused;
          }

          .glitch.enable-on-hover:hover::before,
          .glitch.enable-on-hover:hover::after {
            animation-play-state: running;
          }

          @keyframes glitch-before {
            0%, 85%, 100% {
              opacity: 0;
              transform: translate(0);
              clip-path: inset(0 0 0 0);
            }
            86% {
              opacity: 0.7;
              transform: translate(2px, -1px);
              clip-path: inset(0 0 60% 0);
            }
            90% {
              opacity: 0.55;
              transform: translate(-1px, 1px);
              clip-path: inset(40% 0 0 0);
            }
            94% {
              opacity: 0.65;
              transform: translate(1px, 0);
              clip-path: inset(18% 0 35% 0);
            }
          }

          @keyframes glitch-after {
            0%, 86%, 100% {
              opacity: 0;
              transform: translate(0);
              clip-path: inset(0 0 0 0);
            }
            87% {
              opacity: 0.75;
              transform: translate(-2px, 1px);
              clip-path: inset(55% 0 0 0);
            }
            91% {
              opacity: 0.5;
              transform: translate(2px, -1px);
              clip-path: inset(0 0 58% 0);
            }
            95% {
              opacity: 0.7;
              transform: translate(-1px, 0);
              clip-path: inset(24% 0 30% 0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .glitch::before,
            .glitch::after {
              animation: none !important;
              opacity: 0 !important;
            }
          }
        `}
      </style>

      <div
        className={`glitch ${hoverClass} ${className}`.trim()}
        style={inlineStyles}
        data-text={children}
      >
        {children}
      </div>
    </>
  );
};

export default GlitchText;
