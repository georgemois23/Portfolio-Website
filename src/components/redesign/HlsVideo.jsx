import { useEffect, useRef } from "react";
import Hls from "hls.js";

// Background HLS video: hls.js where supported, native HLS otherwise (Safari).
export default function HlsVideo({ src, style }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls;
    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true });
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        minWidth: "100%",
        minHeight: "100%",
        width: "auto",
        height: "auto",
        objectFit: "cover",
        ...style,
      }}
    />
  );
}
