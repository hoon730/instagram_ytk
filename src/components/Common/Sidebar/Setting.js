import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import MoreItem from "../More/MoreItem";
import { click } from "../../../utils/utils";

const MoreList = styled(motion.div)`
  width: 300px;
  height: 100%;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
`;

const Setting = () => {
  return (
    <MoreList variants={click} initial="initial" animate="visible" exit="exits">
      <MoreItem text={"계정 전환"} />
      <MoreItem text={"로그아웃"} />
    </MoreList>
  );
};

export default Setting;
