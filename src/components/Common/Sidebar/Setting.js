import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import MoreItem from "../More/MoreItem";
import { click } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";

const MoreList = styled(motion.div)`
  position: absolute;
  bottom: 120%;
  left: 0;
  width: 150px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius-12);
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  overflow: hidden;
`;

const Setting = () => {
  return (
    <MoreList variants={click} initial="initial" animate="visible" exit="exits">
      <MoreItem text={"계정 전환"} padding={"10px"} />
      <MoreItem
        text={"로그아웃"}
        padding={"10px"}
        last={"last"}
      />
    </MoreList>
  );
};

export default Setting;
