import { useEffect } from "react";

const scrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

export default scrollToTop;
