import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import MoreItem from "../More/MoreItem";
import { click } from "../../../utils/utils";

const MoreList = styled(motion.div)`
  position: absolute;
  bottom: 110%;
  left: 0;
  width: 150px;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  border-radius: var(--border-radius-12);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
`;

const Setting = () => {
  return (
    <MoreList variants={click} initial="initial" animate="visible" exit="exits">
      <MoreItem text={"계정 전환"} fontSize={"14"} padding={"10px"} />
      <MoreItem text={"로그아웃"} fontSize={"14"} padding={"10px"} />
    </MoreList>
  );
};

export default Setting;
