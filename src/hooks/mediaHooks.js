import React from "react";
import { useMediaQuery } from "react-responsive";

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:430px)",
  });
  return <>{isMobile && children}</>;
};

export const Pc = ({ children }) => {
  const isPc = useMediaQuery({
    query: "(min-width:430px)",
  });
  return <>{isPc && children}</>;
};
