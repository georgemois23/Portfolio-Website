import { useState, useEffect } from "react";
import Lottie from "lottie-react";

import mailAnimation from "../assets/animation.json"; //

const MailSuccess = () => {
  const [size, setSize] = useState(window.innerWidth < 768 ? 100 : 200);

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth < 768 ? 100 : 200);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const style = {
    height: size,
    width: size,
  };

  return (
    <Lottie animationData={mailAnimation} style={style} loop={false} />
  );
};

export default MailSuccess;