import { motion } from "framer-motion";
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import MoreItem from "../More/MoreItem";
import { scale } from "../../../utils/utils";

const MoreList = styled(motion.div)`
  position: absolute;
  bottom: 120%;
  left: 0;
  width: 150px;
  box-shadow: 0 0 10px ${({ theme }) => theme.shadowAlpha};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: var(--border-radius-12);
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  overflow: hidden;

  @media screen and (max-width: 1024px) {
    bottom: 0;
    left: 120%;
  }
`;

const Setting = ({ setSetting }) => {
  const moreListRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreListRef.current && !moreListRef.current.contains(event.target)) {
        setSetting((prev) => !prev);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSetting]);

  return (
    <MoreList
      ref={moreListRef}
      variants={scale}
      initial="initial"
      animate="visible"
      exit="exits"
    >
      <MoreItem text={"계정 전환"} padding={"10px"} />
      <MoreItem text={"로그아웃"} padding={"10px"} last={"last"} />
    </MoreList>
  );
};

export default Setting;
