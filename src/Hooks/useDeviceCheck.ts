import { useState, useEffect } from "react";

const useCheckDeviceView = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 769);
    };

    if (typeof window !== "undefined") {
      // Ensure the code runs only on the client side
      setIsMobile(window.innerWidth <= 769);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return isMobile;
};

export default useCheckDeviceView;
