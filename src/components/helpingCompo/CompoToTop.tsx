import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

type TCompoToTop = {
  children: any;
};

const CompoToTop: React.FC<TCompoToTop> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location]);

  return children;
};

export default CompoToTop;
